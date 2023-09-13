import { CategoryInterface } from "./categoryInterface";
import { ManufacturerInterface } from "./manufacturerInterface";
import { ProductsAttributesInterface } from "./productAttributesInterface";

export interface ProductInterface {
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
  // stock: number;
  // imgUrls: string[];
  // salePrice?: number;
  // className?: string;
}

export interface ProductImageInterface {
  id: string;
  productId: string;
  imageId: string;
  isMain: boolean;
}
