import { Router } from 'express';

import {
  toyCreatedCheck,
  toyUpdateCheck,
} from '../validators/toys.validator.js';
import { toysController } from '../controllers/toys.controller.js';

import { Auth } from '../middlewares/auth.middleware.js';
import { Roles } from '../constants/roles.constants.js';
import {
  uploadCover,
  uploadImage,
  uploadImages,
} from '../middlewares/uploads.toys.middleware.js';
import { toyCommentController } from '../controllers/toy-comment.controller.js';
import {
  toyCommentCreatedCheck,
  toyCommentUpdateCheck,
} from '../validators/toy-comment.validator.js';

const router = Router();
const prefix = '/toys';

router.use(Auth(Roles.admin));

router.post(`${prefix}`, toyCreatedCheck, toysController.create);
router.get(`${prefix}`, Auth(), toysController.findAll);
router.get(`${prefix}/:id`, Auth(), toysController.findById);
router.put(`${prefix}/:id`, toyUpdateCheck, toysController.update);
router.delete(`${prefix}/:id`, toysController.delete);

router.put(`${prefix}/:id/cover`, uploadCover, toysController.updateCover);
router.post(`${prefix}/:id/images`, uploadImages, toysController.addImages);
router.put(
  `${prefix}/:id/images/:imageId`,
  uploadImage,
  toysController.replaceImage,
);
router.delete(`${prefix}/:id/image/:imageId`, toysController.deleteImage);

router
  .route(`${prefix}/:toyId/comments`)
  .get(Auth(), toyCommentController.getAll)
  .post(Auth(), toyCommentCreatedCheck, toyCommentController.create);

router
  .route(`${prefix}/:toyId/comments/:commentId`)
  .put(Auth(), toyCommentUpdateCheck, toyCommentController.update)
  .delete(Auth(), toyCommentController.delete);

export default router;
