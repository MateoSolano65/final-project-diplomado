import { unlink } from 'fs/promises';

export const deleteFiles = async (...files) => {
  if (!files) return;

  const arrayFiles = Object.values(files).flat();

  await Promise.all(
    arrayFiles.map((file) => unlink(file.path).catch(() => {})),
  );
};
