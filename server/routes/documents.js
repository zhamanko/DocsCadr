import { exec } from 'child_process'
import path from 'path'
import fs from 'fs'
import express from 'express'
import multer from 'multer'

const router = express.Router()

const folderUploads = path.resolve('server/files/uploads');
const folderOutput = path.resolve('server/files/output');

if(!fs.existsSync(folderOutput)){
  fs.mkdirSync(folderOutput, { recursive: true });
}

if(!fs.existsSync(folderUploads)){
  fs.mkdirSync(folderUploads, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, folderUploads),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

router.post('/generate-pdf', upload.single('docx'), (req, res) => {
  const docxPath = path.resolve(req.file.path)
  const pdfFilename = req.file.filename.replace(/\.docx$/, '.pdf')
  const pdfPath = path.join(folderOutput, pdfFilename)

  exec(`soffice --headless --convert-to pdf --outdir "${folderOutput}" "${docxPath}"`, (err) => {
    if (err) {
      console.error('LibreOffice error:', err)
      return res.status(500).json({ error: 'Конвертація не вдалася' })
    }

    res.json({ url: `/files/output/` + pdfFilename })

    setTimeout(() => {
      fs.unlink(docxPath, () => {})
      fs.unlink(pdfPath, () => {})
    }, 120000)
  })
})

export default router
