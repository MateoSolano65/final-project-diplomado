import { IsEmail, IsString, MinLength } from '../helpers/validations.helper.js';

import { validate } from '../helpers/validator-errors.helper.js';

export const authRegisterCheck = [
  IsString('name', true),
  IsEmail('email', true),
  MinLength('password', 8),
  validate,
];

export const authLoginCheck = [
  IsEmail('email', true),
  MinLength('password', 8),
  validate,
];
