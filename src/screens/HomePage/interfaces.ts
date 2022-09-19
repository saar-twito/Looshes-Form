import { Dayjs } from "dayjs";

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
  product: IAddProduct[];
  owners: IAddOwner[]
  signerName: string;
  message: string;
};