export interface TextComponentInterface {
  children: React.ReactNode;
  className?: string;
  style?: any;
}

export interface ParagraphComponentInterface extends TextComponentInterface {
  size: "L" | "M" | "S" | "XS";
  weight: "Bold" | "Semibold" | "Medium" | "Regular";
}
