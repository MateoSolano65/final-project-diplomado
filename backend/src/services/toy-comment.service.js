import {
  COMMENT_NOT_AUTHORIZED,
  COMMENT_NOT_FOUND,
} from '../constants/toys.comment.constants.js';
import { HttpError } from '../helpers/error-handler.helper.js';
import { ToyComment } from '../models/toy-comment.model.js';
import { toyService } from './toys.service.js';

class ToyCommentService {
  async getById(id) {
    const comment = await ToyComment.findById(id).populate('user', 'name');

    if (!comment) throw new HttpError(COMMENT_NOT_FOUND, 404);

    return comment;
  }

  async create(toyId, userId, content) {
    await toyService.findById(toyId);

    const newComment = new ToyComment({
      content,
      toy: toyId,
      user: userId,
    });

    await newComment.save();

    return newComment.populate('user', 'name');
  }

  async getByToy(toyId) {
    return ToyComment.find({ toy: toyId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
  }

  async update(dataUpdated) {
    const { toyId, userId, commentId, content } = dataUpdated;

    const comment = await this.getById(commentId);

    this.commentInToy(toyId, comment);

    this.ownComment(comment, userId);

    comment.content = content;
    await comment.save();

    return comment.populate('user', 'name');
  }

  async delete(dataDeleted) {
    const { toyId, commentId, userId } = dataDeleted;

    const comment = await this.getById(commentId);

    this.commentInToy(toyId, comment);

    this.ownComment(comment, userId);

    await ToyComment.findByIdAndDelete(commentId);

    return comment;
  }

  commentInToy(toyId, comment) {
    if (String(comment.toy) !== String(toyId)) {
      throw new HttpError(COMMENT_NOT_AUTHORIZED, 403);
    }
  }

  ownComment(comment, userId) {
    const userComment = String(comment.user._id);
    const userRequest = String(userId);

    if (userComment !== userRequest) {
      throw new HttpError(COMMENT_NOT_AUTHORIZED, 403);
    }
  }
}

export const toyCommentService = new ToyCommentService();
