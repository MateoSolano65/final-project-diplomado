import { Router } from 'express';

import {
  userCreatedCheck,
  userUpdateCheck,
} from '../validators/users.validator.js';

import { usersController } from '../controllers/users.controller.js';
import { Auth } from '../middlewares/auth.middleware.js';
import { Roles } from '../constants/roles.constants.js';

const router = Router();

const prefix = '/users';

router.post(
  `${prefix}`,
  Auth(Roles.admin),
  userCreatedCheck,
  usersController.create,
);
router.get(`${prefix}`, usersController.findAll);

router.get(`${prefix}/:id`, usersController.findById);
router.put(`${prefix}/:id`, userUpdateCheck, usersController.update);
router.delete(`${prefix}/:id`, usersController.delete);

export default router;
