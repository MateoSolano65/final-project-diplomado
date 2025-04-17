import { HttpError } from '../helpers/error-handler.helper.js';
import { JwtService, TokenExpiredError } from '../services/jwt.service.js';
import { userService } from '../services/users.service.js';

const catchError = (error) => {
  if (error instanceof TokenExpiredError) {
    throw new HttpError('Access Token is expired.', 401);
  }

  throw error;
};

const verifyToken = (authorization) => {
  if (!authorization) throw new HttpError('Authentication required', 401);

  const token = authorization.split(' ')[1];
  return JwtService.verifyToken(token);
};

const getUser = async (decoded) => {
  const user = await userService.findOne({ _id: decoded.id });

  if (!user) throw new HttpError('Not authorized', 401);

  return user;
};

const checkActiveSession = (user, decoded) => {
  const dateCompare = new Date(decoded.iat * 1000).toISOString();
  if (user.lastLogin?.toISOString() !== dateCompare) {
    throw new HttpError('There is another active session. Sign in again', 401);
  }
};

const checkRoles = (user, roles) => {
  if (!roles.includes(user.role)) throw new HttpError('Forbidden', 403);
};

export function Auth(...roles) {
  return async function (req, res, next) {
    try {
      const decoded = verifyToken(req.headers.authorization);

      const user = await getUser(decoded);

      checkActiveSession(user, decoded);

      if (roles.length > 0) checkRoles(user, roles);

      req.user = user;

      next();
    } catch (error) {
      return catchError(error);
    }
  };
}
