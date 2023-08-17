export interface ProductsAttributesInterface {
  id: string;
  productId: string;
  attributeId: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  attribute: {
    id: string;
    name: string;
  };
}
