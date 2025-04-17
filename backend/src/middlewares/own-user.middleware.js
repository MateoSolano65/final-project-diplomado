import { Roles } from '../constants/roles.constants.js';
import { HttpError } from '../helpers/error-handler.helper.js';

export const OwnUserMiddleware = (req, res, next) => {
  const { user, params } = req;
  const { id } = params;

  if (user.role !== Roles.admin && String(user._id) !== id) {
    throw new HttpError('Forbidden', 403);
  }

  next();
};
