export interface CategoryInterface {
  id: string;
  name: string;
  slug: string;
  parentCategoryId: string | null;
  createdAt: string;
  updatedAt: string;
  categoryAttributes: Array<CategoryAttributesInterface>;
  description: string;
}

export interface CategoryAttributesInterface {
  id: string;
  categoryId: string;
  attributeId: string;
  createdAt: string;
  updatedAt: string;
  attribute: {
    productAttributes: Array<{
      attributeId: string;
      createdAt: string;
      id: string;
      productId: string;
      updatedAt: string;
      value: string;
    }>;
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    type: 'input' | 'range' | 'bool' | 'select';
  }
}