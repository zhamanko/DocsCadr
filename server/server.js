import express from 'express';
import cors from 'cors';
import path from 'path';
import documentsRouter from './routes/documents.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use('/files', express.static(path.resolve('server/files')));
app.use('/api', documentsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
})