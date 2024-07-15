import express from 'express';
import cors from 'cors';
import { fetchImageById, fetchAllImages } from './routes/fetchImages.js';
import { createImage } from './routes/createImage.js';
import { updateImageById } from './routes/updateImage.js';
import { deleteImageById } from './routes/deleteImage.js';
import { create as createLogger } from './logging.js';
import { uploadImage } from './utils/imageUploader.js';

const logger = createLogger('server');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/images', uploadImage, createImage);
app.get('/api/images', fetchAllImages);
app.get('/api/images/:id', fetchImageById);
app.put('/api/images/:id', updateImageById);
app.delete('/api/images/:id', deleteImageById);

const port = 3001;
app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
