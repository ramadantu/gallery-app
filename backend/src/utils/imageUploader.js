import fs from 'fs';
import multer from 'multer';
import path from 'path';

const IMAGES_VOLUME_PATH = '/var/assets/images';

fs.mkdirSync(IMAGES_VOLUME_PATH, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGES_VOLUME_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadImage = multer({
  storage,
}).single('image');

export { uploadImage };
