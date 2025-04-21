import joi from 'joi';

const envSchema = joi
  .object({
    PORT: joi.number().default(3000),
    DB_URI: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRES_IN: joi.string().required(),

    ADMIN_NAME: joi.string().required(),
    ADMIN_EMAIL: joi.string().email().required(),
    ADMIN_PASSWORD: joi.string().min(8).required(),
  })
  .unknown(true);

const { value, error } = envSchema.validate(process.env, { abortEarly: false });

if (error) {
  const errorMessages = error.details
    .map((detail) => detail.message)
    .join(',\n');

  throw new Error(`Config validation error: ${errorMessages}`);
}

export const envs = {
  port: value.PORT,
  dbUri: value.DB_URI,
  jwtSecret: value.JWT_SECRET,
  jwtExpiresIn: value.JWT_EXPIRES_IN,
  adminName: value.ADMIN_NAME,
  adminEmail: value.ADMIN_EMAIL,
  adminPassword: value.ADMIN_PASSWORD,
};
