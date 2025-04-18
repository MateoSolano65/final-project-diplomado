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

const router = Router();

router.use(Auth(Roles.admin));

const prefix = '/toys';

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

export default router;
