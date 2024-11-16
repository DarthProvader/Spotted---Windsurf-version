import express from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 3001

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'public', 'images')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now()
    const ext = path.extname(file.originalname)
    cb(null, `${timestamp}${ext}`)
  }
})

const upload = multer({ storage: storage })

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Serve static files from the public directory
app.use('/images', express.static(path.join(__dirname, 'public', 'images')))
app.use(express.static('public'))
app.use(express.json())

// Handle image upload
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }
  const imagePath = `/images/${req.file.filename}`
  res.json({ path: imagePath })
})

// Handle image deletion
app.post('/api/delete-image', (req, res) => {
  const { url } = req.body
  const imagePath = path.join(__dirname, 'public', url)

  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err)
      return res.status(500).json({ error: 'Failed to delete image' })
    }
    res.json({ message: 'Image deleted successfully' })
  })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
