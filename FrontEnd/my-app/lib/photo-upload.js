export const MAX_PHOTOS = 5;
export const MAX_PHOTO_SIZE = 5 * 1024 * 1024;

export function readPhotoFile(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Veuillez choisir un fichier image."));
      return;
    }
    if (file.size > MAX_PHOTO_SIZE) {
      reject(new Error("Chaque photo ne doit pas dépasser 5 Mo."));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Impossible de lire cette photo."));
    reader.readAsDataURL(file);
  });
}
