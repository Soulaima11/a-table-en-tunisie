const tailleMax = 3000;

export function avatarValide(valeur: unknown): valeur is string {
  return typeof valeur === "string" && valeur.length <= tailleMax &&
    /^data:image\/jpeg;base64,[\w+/]+={0,2}$/.test(valeur);
}

export async function preparerAvatar(fichier: File) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(fichier.type) || fichier.size > 8 * 1024 * 1024) {
    throw new Error("Format ou taille de fichier incompatible.");
  }

  const image = await createImageBitmap(fichier);
  try {
    const toile = document.createElement("canvas");
    const contexte = toile.getContext("2d", { alpha: false });
    if (!contexte) throw new Error("Canvas indisponible.");
    const cote = Math.min(image.width, image.height);

    for (const dimension of [96, 72, 48]) {
      toile.width = toile.height = dimension;
      contexte.fillStyle = "#fff";
      contexte.fillRect(0, 0, dimension, dimension);
      contexte.drawImage(image, (image.width - cote) / 2, (image.height - cote) / 2, cote, cote,
        0, 0, dimension, dimension);
      for (const qualite of [.8, .65, .45]) {
        const avatar = toile.toDataURL("image/jpeg", qualite);
        if (avatarValide(avatar)) return avatar;
      }
    }
    throw new Error("Image trop détaillée.");
  } finally {
    image.close();
  }
}
