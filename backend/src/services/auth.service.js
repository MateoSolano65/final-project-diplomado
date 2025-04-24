import { HttpError } from '../helpers/error-handler.helper.js';
import { PasswordHelper } from '../helpers/password.helper.js';
import { JwtService } from './jwt.service.js';

import { userService } from './users.service.js';

class AuthService {
  async register(dataUser) {
    const passwordHash = await PasswordHelper.hashPassword(dataUser.password);
    dataUser.password = passwordHash;

    const user = await userService.create(dataUser);

    // Generate JWT token as in login method
    const token = JwtService.generateToken({ id: user._id });

    // Set user's lastLogin timestamp
    const issuedAt = Math.floor(new Date().getTime() / 1000.0);
    const lastLogin = new Date(issuedAt * 1000);
    await userService.update(user._id, { lastLogin });

    user.password = undefined;

    // Return both user and token, same format as login
    return { user, token };
  }

  async login(email, password) {
    const user = await userService.findByEmail(email);

    if (!user) throw new HttpError('Credentials are incorrect', 401);

    const matchPassword = await PasswordHelper.comparePassword(
      password,
      user.password,
    );

    if (!matchPassword) throw new HttpError('Credentials are incorrect', 401);

    const token = JwtService.generateToken({ id: user._id });

    user.password = undefined;

    const issuedAt = Math.floor(new Date().getTime() / 1000.0);

    const lastLogin = new Date(issuedAt * 1000);

    await userService.update(user._id, { lastLogin });

    return { user, token };
  }
}

const authService = new AuthService();

export { authService };
