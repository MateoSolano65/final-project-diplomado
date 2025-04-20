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

router.post(
  `${prefix}`,
  Auth(Roles.admin),
  toyCreatedCheck,
  toysController.create,
);
router.get(`${prefix}`, toysController.findAll);
router.get(`${prefix}/:id`, toysController.findById);
router.put(
  `${prefix}/:id`,
  Auth(Roles.admin),
  toyUpdateCheck,
  toysController.update,
);
router.delete(`${prefix}/:id`, Auth(Roles.admin), toysController.delete);

router.put(
  `${prefix}/:id/cover`,
  Auth(Roles.admin),
  uploadCover,
  toysController.updateCover,
);
router.post(
  `${prefix}/:id/images`,
  Auth(Roles.admin),
  uploadImages,
  toysController.addImages,
);
router.put(
  `${prefix}/:id/images/:imageId`,
  Auth(Roles.admin),
  uploadImage,
  toysController.replaceImage,
);
router.delete(
  `${prefix}/:id/image/:imageId`,
  Auth(Roles.admin),
  toysController.deleteImage,
);

router
  .route(`${prefix}/:toyId/comments`)
  .get(Auth(), toyCommentController.getAll)
  .post(Auth(), toyCommentCreatedCheck, toyCommentController.create);

router
  .route(`${prefix}/:toyId/comments/:commentId`)
  .put(Auth(), toyCommentUpdateCheck, toyCommentController.update)
  .delete(Auth(), toyCommentController.delete);

export default router;
