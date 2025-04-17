import jwt from 'jsonwebtoken';
import { envs } from '../config/envs.config.js';

export class JwtService {
  static secretKey = envs.jwtSecret;
  static expiresIn = envs.jwtExpiresIn;

  static generateToken(payload) {
    return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
  }

  static verifyToken(token) {
    return jwt.verify(token, this.secretKey);
  }
}

export const TokenExpiredError = jwt.TokenExpiredError;
