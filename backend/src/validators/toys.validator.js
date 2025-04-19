import { validate } from '../helpers/validator-errors.helper.js';
import {
  IsString,
  IsIn,
  MinLength,
  IsNumber,
} from '../helpers/validations.helper.js';

import { toyCategories } from '../constants/toy.constants.js';

export const toyCreatedCheck = [
  IsString('title', true),
  IsIn('category', toyCategories, true),
  IsString('description', true),
  validate,
];

export const toyUpdateCheck = [
  IsString('title', false),
  IsIn('category', toyCategories, false),
  IsString('description', false),
  validate,
];
