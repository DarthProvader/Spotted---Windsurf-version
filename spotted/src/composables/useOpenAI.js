import { ref } from 'vue'
import OpenAI from 'openai'

export default function useOpenAI() {
    const error = ref(null)
    const isPending = ref(false)
    const recognitionResult = ref(null)

    const recognizeCar = async (imageFile) => {
        error.value = null
        isPending.value = true
        recognitionResult.value = null

        try {
            console.log('Environment variables:', {
                token: import.meta.env.VITE_GITHUB_TOKEN,
                endpoint: import.meta.env.VITE_OPENAI_ENDPOINT,
                model: import.meta.env.VITE_OPENAI_MODEL
            })

            // Convert image to base64
            const reader = new FileReader()
            const imageBase64Promise = new Promise((resolve, reject) => {
                reader.onload = () => {
                    // Extract base64 data from the FileReader result
                    const base64Data = reader.result.split(',')[1]
                    resolve(`data:${imageFile.type};base64,${base64Data}`)
                }
                reader.onerror = reject
            })
            reader.readAsDataURL(imageFile)
            const imageBase64 = await imageBase64Promise

            // Create OpenAI client with explicit token
            const token = import.meta.env.VITE_GITHUB_TOKEN
            if (!token) {
                throw new Error('GitHub token is not available in environment variables')
            }

            const client = new OpenAI({ 
                baseURL: import.meta.env.VITE_OPENAI_ENDPOINT,
                apiKey: token,
                dangerouslyAllowBrowser: true
            })

            const response = await client.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "You are a car recognition assistant. Analyze the image and return ONLY a JSON object with the following properties if a car is detected: make (string), model (string), year (number, estimated), color (string). If no car is detected or the image is unclear, return a JSON object with an error property. Do not include any markdown formatting or code blocks in your response."
                    },
                    {
                        role: "user",
                        content: [
                            { type: "text", text: "What car is in this image? Return only the JSON data without any markdown formatting." },
                            { type: "image_url", image_url: { url: imageBase64, details: "high" } }
                        ]
                    }
                ],
                temperature: 1.0,
                top_p: 1.0,
                max_tokens: 1000,
                model: import.meta.env.VITE_OPENAI_MODEL
            })

            // Clean the response of any markdown formatting
            const cleanContent = response.choices[0].message.content
                .replace(/```json\n?/g, '')  // Remove ```json
                .replace(/```\n?/g, '')      // Remove closing ```
                .trim()                      // Remove any extra whitespace

            console.log('Cleaned response:', cleanContent)
            const result = JSON.parse(cleanContent)
            
            if (result.error) {
                throw new Error(result.error)
            }

            recognitionResult.value = result
            return { error: null, result }
        } catch (err) {
            console.error('OpenAI API Error:', err)
            error.value = err.message || 'Failed to recognize car'
            recognitionResult.value = null
            return { error: error.value, result: null }
        } finally {
            isPending.value = false
        }
    }

    return {
        error,
        isPending,
        recognitionResult,
        recognizeCar
    }
}
