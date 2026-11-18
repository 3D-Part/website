export type OrderBodyInterface =
  | OrderBodyInterfacePerson
  | OrderBodyInterfaceCompany;

interface OrderBodyInterfacePerson {
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

export interface OrderBodyInterfaceCompany {
  companyName: string;
  // who at the company placed the order
  fullName: string;
  phone: string;
  city: string;
  postCode: string;
  street: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  email: string;
  // country: string;
  jib: string;
  description: string;
}

export interface ElectronPaymentData {
  companyName: string;
  fullName?: string;
  phone: string;
  city: string;
  postCode: string;
  street: string;
  email: string;
  jib: string;
  description: string;
}
