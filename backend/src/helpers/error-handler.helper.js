import { request, response } from 'express';
import { deleteFiles } from './delete-files.helper.js';

class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.code = String(errorCode).length > 3 ? 500 : errorCode;
  }
}

const errorHandler = (err, req, res, next) => {
  console.error(err);
  const message = err.code ? err.message : 'Internal server error';

  const files = getFilesFromRequest(req);

  if (files.length > 0) deleteFiles(files).then(() => {});

  return res.status(err.code || 500).json({ message });
};

const getFilesFromRequest = (req) => {
  const filesArray = Array.isArray(req.files) ? req.files : [];
  const singleFile = req.file ? [req.file] : [];
  return [...filesArray, ...singleFile];
};

export { HttpError, errorHandler };
