import jwt from 'jsonwebtoken';

export class JwtService {
  static secretKey = process.env.JWT_SECRET;
  static expiresIn = process.env.JWT_EXPIRES_IN || '1h';

  static generateToken(payload) {
    return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
  }

  static verifyToken(token) {
    return jwt.verify(token, this.secretKey);
  }
}

export const TokenExpiredError = jwt.TokenExpiredError;
