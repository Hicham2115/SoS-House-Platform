export const MAX_AVATAR_SIZE = 2 * 1024 * 1024;
export const MAX_PHOTO_SIZE = 5 * 1024 * 1024;

export function readImageFile(file, maxSize, tooLargeMessage) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Veuillez choisir un fichier image."));
      return;
    }
    if (file.size > maxSize) {
      reject(new Error(tooLargeMessage));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Impossible de lire ce fichier."));
    reader.readAsDataURL(file);
  });
}
