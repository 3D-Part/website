import { CategoryInterface } from "./categoryInterface";
import { ManufacturerInterface } from "./manufacturerInterface";
import { ProductsAttributesInterface } from "./productAttributesInterface";

export interface ProductInterface {
  isPublished?: boolean;
  id: string;
  name: string;
  description?: string;
  details?: string;
  sku: string;
  price: string;
  categoryId: string;
  manufacturerId: string;
  category: CategoryInterface;
  manufacturer: ManufacturerInterface;
  images: ProductImageInterface[];
  productAttributes: ProductsAttributesInterface[];
  updatedAt: Date;
  weight: string;
  quantity: number;
  salePrice?: string;
  isBackorder?: boolean;
  icons?: string[];
  // the frame color of the product's card (#rrggbb), set in the admin
  highlightColor?: string | null;
  keywords?: string[];
  productOnSale: { discountedPrice: string }[];
  // stock: number;
  // imgUrls: string[];
  // className?: string;
}

export interface ProductImageInterface {
  id: string;
  productId: string;
  imageId: string;
  isMain: boolean;
}
