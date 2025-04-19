import mongoose, { model, Schema } from 'mongoose';
import { validateMongo } from '../helpers/validate-mongo.helper.js';

const toyCommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    toy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Toy',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

toyCommentSchema.post('save', validateMongo);
toyCommentSchema.post('findOneAndUpdate', validateMongo);

const ToyComment = model('ToyComment', toyCommentSchema);

export { ToyComment };
