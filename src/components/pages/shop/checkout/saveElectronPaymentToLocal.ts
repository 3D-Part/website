import { LocalStorageHelper } from "@/shared/helper/LocalStorageHelper";
import {
  ElectronPaymentData,
  OrderBodyInterfaceCompany,
} from "@/shared/interfaces/orderInterface";

export const saveElectronPaymentToLocal = (data: any) => {
  try {
    const {
      companyName,
      companyPdv,
      email,
      phone,
      street,
      city,
      postCode,
      jib,
      description,
    } = data;

    const electronPaymentData: ElectronPaymentData = {
      companyName,
      companyPdv,
      email,
      phone,
      street,
      city,
      postCode,
      jib,
      description,
    };

    LocalStorageHelper.saveItem("electronPaymentData", electronPaymentData);
  } catch (error) {
    console.error(
      "Error saving electron payment data to local storage:",
      error
    );
  }
};

export const readElectronPaymentFromLocal = ():
  | ElectronPaymentData
  | undefined => {
  try {
    const electronPaymentData = LocalStorageHelper.getItem(
      "electronPaymentData"
    );

    return electronPaymentData;
  } catch (error) {
    console.error(
      "Error reading electron payment data from local storage:",
      error
    );
    return undefined;
  }
};
