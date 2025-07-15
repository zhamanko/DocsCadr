import express from 'express';
import cors from 'cors';
import path from 'path';
import models from './models/index.js';
import documentsRouter from './routes/documents.js';
import positionRouter from './routes/positions.js';
import employeesRouter from './routes/employees.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve('server/files')));

app.use('/api', documentsRouter);
app.use('/api', positionRouter);
app.use('/api', employeesRouter);


app.listen(PORT, async () => {
    console.log(`Server is running on localhost:${PORT}`);
    await models.initModels();
})