import { validate } from '../helpers/validator-errors.helper.js';
import {
  IsEmail,
  IsString,
  MinLength,
  IsIn,
} from '../helpers/validations.helper.js';

export const userCreatedCheck = [
  IsString('name', true),
  IsEmail('email', true),
  MinLength('password', 8),
  IsIn('role', ['admin', 'user'], false),
  validate,
];

export const userUpdateCheck = [
  IsString('name', false),
  IsEmail('email', false),
  validate,
];
