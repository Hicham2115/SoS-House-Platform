export const MAX_AVATAR_SIZE = 2 * 1024 * 1024;

export function readAvatarFile(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Veuillez choisir un fichier image."));
      return;
    }
    if (file.size > MAX_AVATAR_SIZE) {
      reject(new Error("L'image ne doit pas dépasser 2 Mo."));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Impossible de lire cette image."));
    reader.readAsDataURL(file);
  });
}
