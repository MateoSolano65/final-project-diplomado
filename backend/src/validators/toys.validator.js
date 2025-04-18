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
  IsString('review', true),
  IsNumber('rating', true, { min: 1, max: 5 }),
  validate,
];

export const toyUpdateCheck = [
  IsString('title', false),
  IsIn('category', toyCategories, false),
  IsString('description', false),
  IsString('review', false),
  IsNumber('rating', false),
  validate,
];
