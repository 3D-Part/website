import { ProductImageInterface } from "../interfaces/productsInterface";
import { imageToAmazonURl } from "./imageToAmazonUrl";

export const getMainImage = (images: ProductImageInterface[]): string => {
  if (!images || images.length === 0) {
    return "/assets/img/no-image.svg";
  }

  let image = imageToAmazonURl(images[0].imageId);
  images.map((img) => {
    if (img.isMain) {
      image = imageToAmazonURl(img.imageId);
    }
  });

  return image;
};
