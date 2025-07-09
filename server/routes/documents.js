import { exec } from 'child_process'
import path from 'path'
import fs from 'fs'
import express from 'express'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'server/uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

router.post('/generate-pdf', upload.single('docx'), (req, res) => {
  const docxPath = path.resolve(req.file.path)
  const pdfFilename = req.file.filename.replace(/\.docx$/, '.pdf')
  const outputDir = path.resolve('server/output')
  const pdfPath = path.join(outputDir, pdfFilename)

  exec(`soffice --headless --convert-to pdf --outdir "${outputDir}" "${docxPath}"`, (err) => {
    if (err) {
      console.error('LibreOffice error:', err)
      return res.status(500).json({ error: 'Конвертація не вдалася' })
    }

    res.json({ url: `/` + pdfFilename })

    setTimeout(() => {
      fs.unlink(docxPath, () => {})
      fs.unlink(pdfPath, () => {})
    }, 120000)
  })
})

export default router
