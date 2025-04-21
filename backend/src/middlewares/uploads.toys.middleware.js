import { extname, join } from 'path';
import { mkdir } from 'fs/promises';

import multer from 'multer';
import mongoose from 'mongoose';

import { HttpError } from '../helpers/error-handler.helper.js';

const UPLOADS_DIR = join(process.cwd(), 'uploads/toys');

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    await mkdir(UPLOADS_DIR, { recursive: true });
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, callback) {
    const ext = extname(file.originalname);
    const id = new mongoose.Types.ObjectId();
    callback(null, `${id}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg','image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter,
});

export const uploadCover = (req, res, next) => {
  return upload.single('cover')(req, res, (err) => {
    if (err) return next(new HttpError(err.message, 422));

    if (!req.file) next(new HttpError('No file uploaded', 422));

    const urlCover = `/images/${req.file.filename}`;
    req.body.cover = urlCover;

    next();
  });
};

export const uploadImages = (req, res, next) => {
  return upload.array('images', 5)(req, res, (err) => {
    if (err) return next(new HttpError(err.message, 422));

    if (!req.files || req.files.length === 0) {
      return next(new HttpError('No files uploaded', 422));
    }

    const urls = req.files.map((file) => `/images/${file.filename}`);
    req.body.images = urls;

    next();
  });
};

export const uploadImage = (req, res, next) => {
  return upload.single('image')(req, res, (err) => {
    if (err) return next(new HttpError(err.message, 422));

    if (!req.file) next(new HttpError('No file uploaded', 422));

    const urlImage = `/images/${req.file.filename}`;
    req.body.image = urlImage;

    next();
  });
};
