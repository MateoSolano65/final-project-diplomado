import { IsString } from '../helpers/validations.helper.js';
import { validate } from '../helpers/validator-errors.helper.js';

export const toyCommentCreatedCheck = [IsString('content', true), validate];

export const toyCommentUpdateCheck = [IsString('content', false), validate];
