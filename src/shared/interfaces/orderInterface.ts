export interface OrderBodyInterface {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  postCode: string;
  street: string;
  products: {
    productId: string;
    quantity: number;
  }[];
}
