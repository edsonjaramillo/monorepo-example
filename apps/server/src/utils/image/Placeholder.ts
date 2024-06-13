import sharp from 'sharp';

class Placeholder {
  async imageToBase64(url: string, width: number, height: number) {
    const scale = 16;
    const isLandscape = width > height;
    // make sure aspect ratio is always positive and whole number
    const aspectRatio = isLandscape ? Math.round(width / height) : Math.round(height / width);

    const scaledWidth = isLandscape ? scale * aspectRatio : scale;
    const scaledHeight = isLandscape ? scale : scale * aspectRatio;

    const image = await this.downloadImage(url);
    const buffer = await sharp(image)
      .resize({ width: scaledWidth, height: scaledHeight })
      .blur(2)
      .toBuffer();

    const base64 = buffer.toString('base64');
    return `data:image/jpeg;base64,${base64}`;
  }

  async downloadImage(url: string) {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return new Uint8Array(buffer);
  }
}

export const placeholder = new Placeholder();
