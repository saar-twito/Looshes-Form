import { Dayjs } from "dayjs";
import { UseFormRegister } from "react-hook-form";

interface IAddProduct {
  itemName: "",
  color: "",
  amount: "",
  size: ""
  kind: "",
}

interface IAddOwner {
  firstName: "",
  lastName: "",
}


export interface IFormUtils {
  register: UseFormRegister<FormValues>,
  errors: any,
}


export interface FormValues {
  date: Dayjs | null
  businessDetails: {
    companyName: string;
    companyPhone: string;
    email: string;
    companyOccupation: string;
    vatNumber: string;
    phonePersonal: string;
    faxNumber: string;
    companyAddress: string;
  }
  products: IAddProduct[];
  owners: IAddOwner[]
  array: string[];
  signerName: string;
  message: string;
};