import { request, response } from 'express';
import { toyCommentService } from '../services/toy-comment.service.js';

class ToyCommentController {
  async create(req = request, res = response) {
    const { content } = req.body;
    const { toyId } = req.params;
    const userId = req.user._id;

    const comment = await toyCommentService.create(toyId, userId, content);

    return res.status(201).json(comment);
  }

  async getAll(req = request, res = response) {
    const { toyId } = req.params;

    const comments = await toyCommentService.getByToy(toyId);
    return res.status(200).json(comments);
  }

  async update(req = request, res = response) {
    const { content } = req.body;
    const { commentId, toyId } = req.params;
    const userId = req.user._id;

    const dataUpdated = { toyId, userId, commentId, content };

    const comment = await toyCommentService.update(dataUpdated);

    return res.status(200).json(comment);
  }

  async delete(req = request, res = response) {
    const { toyId, commentId } = req.params;
    const userId = req.user._id;

    const dataDeleted = { toyId, userId, commentId };

    await toyCommentService.delete(dataDeleted);
    return res.status(204).end();
  }
}

export const toyCommentController = new ToyCommentController();
