import { unlink } from 'fs/promises';
import { join } from 'path';

import { Toy } from '../models/toys.model.js';
import { TOY_NOT_FOUND, IMAGE_NOT_FOUND } from '../constants/toy.constants.js';
import { HttpError } from '../helpers/error-handler.helper.js';

class ToysService {
  async create(dataToy) {
    const toy = new Toy(dataToy);

    await toy.save();

    return toy;
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const toys = await Toy.find({}).skip(skip).limit(limit);

    return toys;
  }

  async findById(id) {
    const toy = await Toy.findById(id);

    if (!toy) throw new HttpError(TOY_NOT_FOUND, 404);

    return toy;
  }

  async update(id, dataToy) {
    const toyUpdate = await Toy.findByIdAndUpdate(id, dataToy, {
      new: true,
    });

    if (!toyUpdate) throw new HttpError(TOY_NOT_FOUND, 404);

    return toyUpdate;
  }

  async delete(id) {
    const toyDelete = await Toy.findByIdAndDelete(id);

    if (!toyDelete) throw new HttpError(TOY_NOT_FOUND, 404);

    const urls = [toyDelete.cover, ...toyDelete.images.map((img) => img.url)];

    urls.forEach(async (url) => await this.deleteFile(url));

    return toyDelete;
  }

  async updateCover(id, cover) {
    const toy = await this.findById(id);

    const toyUpdate = await Toy.findByIdAndUpdate(id, { cover }, { new: true });

    if (toy?.cover !== toyUpdate.cover) await this.deleteFile(toy?.cover);

    return toyUpdate;
  }

  async addImages(id, images) {
    const formattedImages = images.map((url) => ({ url }));

    const toyUpdate = await Toy.findByIdAndUpdate(
      id,
      { $push: { images: { $each: formattedImages } } },
      { new: true },
    );

    if (!toyUpdate) throw new HttpError(TOY_NOT_FOUND, 404);

    return toyUpdate;
  }

  async replaceImage(id, imageId, newImageUrl) {
    const toy = await Toy.findOne(
      { _id: id, 'images._id': imageId },
      { 'images.$': 1 },
    );

    if (!toy) throw new HttpError(IMAGE_NOT_FOUND, 404);

    const oldImage = toy.images[0];

    if (!oldImage) throw new HttpError(IMAGE_NOT_FOUND, 404);

    const toyUpdate = await Toy.findOneAndUpdate(
      { _id: id, 'images._id': imageId },
      { $set: { 'images.$.url': newImageUrl } },
      { new: true },
    );

    if (!toyUpdate) throw new HttpError(IMAGE_NOT_FOUND, 404);

    await this.deleteFile(oldImage.url);

    return toyUpdate;
  }

  async deleteImage(id, imageId) {
    const toy = await this.findById(id);

    const imageToDelete = toy.images.find(
      (img) => img._id.toString() === imageId,
    );

    if (!imageToDelete) throw new HttpError(IMAGE_NOT_FOUND, 404);

    const toyUpdate = await Toy.findByIdAndUpdate(
      id,
      { $pull: { images: { _id: imageId } } },
      { new: true },
    );

    await this.deleteFile(imageToDelete.url);

    return toyUpdate;
  }

  async deleteFile(file) {
    if (!file) return;

    const newPath = file.replace('/images/', '/uploads/toys/');
    const pathFile = join(process.cwd(), `${newPath}`);

    unlink(pathFile).catch(() => {});
  }
}

const toyService = new ToysService();

export { toyService };
