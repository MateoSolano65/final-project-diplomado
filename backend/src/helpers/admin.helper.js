import { userService } from '../services/users.service.js';
import { envs } from '../config/envs.config.js';
import { PasswordHelper } from './password.helper.js';

export async function createAdminUser() {
  try {
    const email = envs.adminEmail;
    const password = envs.adminPassword;
    const name = envs.adminName;
    const role = 'admin';

    const existingAdmin = await userService.findOne({ role });

    if (!existingAdmin) {
      const passwordHash = await PasswordHelper.hashPassword(password);
      await userService.create({ name, email, password: passwordHash, role });
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}
