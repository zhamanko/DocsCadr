import { exec } from 'child_process'
import path from 'path'
import fs from 'fs'
import express from 'express'
import multer from 'multer'

const router = express.Router()

const folderTemp = path.resolve('server/files/temp');

if(!fs.existsSync(folderTemp)){
  fs.mkdirSync(folderTemp, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, folderTemp),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

router.post('/generate-pdf', upload.single('docx'), (req, res) => {
  const docxPath = path.resolve(req.file.path)
  const pdfFilename = req.file.filename.replace(/\.docx$/, '.pdf')
  const pdfPath = path.join(folderTemp, pdfFilename)

  exec(`soffice --headless --convert-to pdf --outdir "${folderTemp}" "${docxPath}"`, (err) => {
    if (err) {
      console.error('LibreOffice error:', err)
      return res.status(500).json({ error: 'Конвертація не вдалася' })
    }

    res.json({ url: `/files/temp/` + pdfFilename })

    setTimeout(() => {
      fs.rm(folderTemp, { recursive: true, force: true }, (err) => {
        if(err){
          console.log("Папка вже видалена");
        }
      })
    }, 300000)
  })
})

export default router
