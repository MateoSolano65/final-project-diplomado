import mongoose from 'mongoose';

import { validateMongo } from '../helpers/validate-mongo.helper.js';
import { toyCategories } from '../constants/toy.constants.js';

const { model } = mongoose;

const toySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: toyCategories,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    review: {
      type: String, // Here you can include a toy review
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    cover: {
      type: String, // URL of a toy image (optional)
      required: false,
    },
    images: {
      type: [{ url: String }], // Array of URLs of toy images (optional)
      required: false,
      default: [],
    },
    tags: {
      type: [String], // Para agregar etiquetas relacionadas con el artículo, como "recomendado", "para niños", etc.
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

toySchema.post('save', validateMongo);
toySchema.post('findOneAndUpdate', validateMongo);

// Create the toy model
const Toy = model('Toy', toySchema);

export { Toy };
