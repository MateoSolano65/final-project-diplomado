import { request, response } from 'express';
import { authService } from '../services/auth.service.js';

class AuthController {
  async login(req = request, res = response) {
    const { email, password } = req.body;

    const dataLogin = await authService.login(email, password);

    res.status(200).json(dataLogin);
  }

  async register(req = request, res = response) {
    const dataUser = req.body;
    const user = await authService.register(dataUser);
    res.status(201).json(user);
  }
}

const authController = new AuthController();

export { authController };
