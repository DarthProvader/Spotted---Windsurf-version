import { ref } from 'vue'
import OpenAI from 'openai'

const endpoint = "https://models.inference.ai.azure.com"
const modelName = "gpt-4o"

export default function useOpenAI() {
    const error = ref(null)
    const isPending = ref(false)
    const recognitionResult = ref(null)

    const recognizeCar = async (imageFile) => {
        error.value = null
        isPending.value = true
        recognitionResult.value = null

        try {
            // Convert image to base64
            const reader = new FileReader()
            const imageBase64Promise = new Promise((resolve, reject) => {
                reader.onload = () => resolve(reader.result)
                reader.onerror = reject
            })
            reader.readAsDataURL(imageFile)
            const imageBase64 = await imageBase64Promise

            const client = new OpenAI({ 
                baseURL: endpoint, 
                apiKey: process.env.VUE_APP_OPENAI_API_KEY 
            })

            const response = await client.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "You are a car recognition assistant. Analyze the image and return ONLY a JSON object with the following properties if a car is detected: make (string), model (string), year (number, estimated), color (string). If no car is detected or the image is unclear, return a JSON object with an error property."
                    },
                    {
                        role: "user",
                        content: [
                            { type: "text", text: "What car is in this image? Return only the JSON data." },
                            { type: "image_url", image_url: { url: imageBase64, details: "high" } }
                        ]
                    }
                ],
                model: modelName
            })

            const result = JSON.parse(response.choices[0].message.content)
            
            if (result.error) {
                throw new Error(result.error)
            }

            recognitionResult.value = result
        } catch (err) {
            error.value = err.message || 'Failed to recognize car'
            recognitionResult.value = null
        } finally {
            isPending.value = false
        }

        return { error: error.value, result: recognitionResult.value }
    }

    return {
        error,
        isPending,
        recognitionResult,
        recognizeCar
    }
}
