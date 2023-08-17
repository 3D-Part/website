export interface CategoryInterface {
  id: string;
  name: string;
  slug: string;
  parentCategoryId: string | null;
  createdAt: string;
  updatedAt: string;

  description: string;
}
