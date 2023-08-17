export const textFormatter = (text: string, maxText: number) => {
  return text.slice(0, maxText - 3) + "...";
};
