import { exec } from 'child_process'
import path from 'path'
import fs from 'fs'
import express from 'express'
import multer from 'multer'
import os from 'os'

const router = express.Router()

const folderTemp = path.join(process.env.TEMP_DIR, 'previews');

if (!fs.existsSync(folderTemp)) {
  fs.mkdirSync(folderTemp, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, folderTemp),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

function getSofficePath() {
  switch (os.platform()) {
    case 'darwin':
      return '/Applications/LibreOffice.app/Contents/MacOS/soffice';
    default:
      return 'soffice';
  }
}

router.post('/generate-pdf', upload.single('docx'), (req, res) => {
  console.log(`Temporary folder for previews: ${folderTemp}`);
  const docxPath = path.resolve(req.file.path)
  const pdfFilename = req.file.filename.replace(/\.docx$/, '.pdf')
  const pdfPath = path.join(folderTemp, pdfFilename)

  const sofficePath = getSofficePath();

  exec(`${sofficePath} --headless --convert-to pdf --outdir "${folderTemp}" "${docxPath}"`, (err) => {
    if (err) {
      console.error('LibreOffice error:', err)
      return res.status(500).json({ error: 'Конвертація не вдалася' })
    }

    fs.readFile(pdfPath, (err, data) => {
      if (err) {
        console.error('Помилка читання PDF:', err);
        return res.status(500).json({ error: 'Не вдалося прочитати PDF' });
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename="' + pdfFilename + '"');
      res.send(data);
    });

  })
})

export default router
