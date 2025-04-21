import { join, dirname } from 'path';
import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';

import cors from 'cors';

import express from 'express';

import 'dotenv/config';

import './src/config/envs.config.js';

import { connectDB } from './src/config/db.config.js';
import { errorHandler, HttpError } from './src/helpers/error-handler.helper.js';
import { validateObjectId } from './src/middlewares/validate-objectId.middleware.js';
import { envs } from './src/config/envs.config.js';
import { createAdminUser } from './src/helpers/admin.helper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routesPath = join(__dirname, './src/routes');
const routeFiles = await readdir(routesPath);

async function loadRoutes() {
  for (const file of routeFiles) {
    const routeModule = await import(`./src/routes/${file}`);
    const router = routeModule.default;

    router.param('id', validateObjectId);

    app.use('/api/v1.0', router);
  }
}

await connectDB();

await createAdminUser()

await loadRoutes();

app.use('/images', express.static(join(__dirname, 'uploads/toys')));

app.use((req, res, next) => {
  const error = new HttpError('Not found', 404);
  next(error);
});

app.use(errorHandler);

app.listen(envs.port, () => {
  console.log(`Server is running on port ${envs.port}`);
});
