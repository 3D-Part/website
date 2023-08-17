export const imageToAmazonURl = (url: string) => {
  const noImageUrl = "/assets/img/no-image.svg";
  if (url === noImageUrl) {
    return url;
  }
  return process.env.NEXT_PUBLIC_AMAZON_IMAGES + url;
};
