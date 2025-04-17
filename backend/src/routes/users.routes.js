import { Router } from 'express';

import {
  userCreatedCheck,
  userUpdateCheck,
} from '../validators/users.validator.js';

import { usersController } from '../controllers/users.controller.js';
import { Auth } from '../middlewares/auth.middleware.js';
import { Roles } from '../constants/roles.constants.js';
import { OwnUserMiddleware } from '../middlewares/own-user.middleware.js';

const router = Router();

const prefix = '/users';

router.use(Auth());

router.post(
  `${prefix}`,
  Auth(Roles.admin),
  userCreatedCheck,
  usersController.create,
);
router.get(`${prefix}`, Auth(Roles.admin), usersController.findAll);

router.get(`${prefix}/:id`, OwnUserMiddleware, usersController.findById);

router.put(
  `${prefix}/:id`,
  OwnUserMiddleware,
  userUpdateCheck,
  usersController.update,
);

router.delete(`${prefix}/:id`, OwnUserMiddleware, usersController.delete);

export default router;
