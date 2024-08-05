export function normalizeString(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function processImages(order: string, images: Express.Multer.File[]): string[] {
  const imgArray: string[] = [];

  const parsedOrder = JSON.parse(order) as string[];
  parsedOrder.forEach((name) => {
    const img = images.find((img) => img.originalname === name);
    if (img) {
      imgArray.push(`http://localhost:3000/images/${img.filename}`);
    }
  });

  return imgArray;
}
