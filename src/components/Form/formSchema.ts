import isAlpha from "validator/lib/isAlpha";
import isAlphanumeric from "validator/lib/isAlphanumeric";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import { array, object, string, number } from 'yup';

export const formSchema = object({
  date: string().required(),

  businessDetails: object({
    companyName: string()
      .test("is-company-name", "Hebrew or English only", value => isAlphanumeric(`${value}`, 'en-US', { ignore: ' ' }) || isAlphanumeric(`${value}`, 'he', { ignore: ' ' }))
      .max(50, "The company name should contain up to 50 characters")
      .min(1, "The company name must have at least one character")
      .trim()
      .required("required"),

    companyPhone: string()
      .test("is-phone", `Israel or USA format only`, value => isMobilePhone(`${value}`, ['he-IL', 'en-US']))
      .trim()
      .required("required"),

    email: string()
      .email("Invalid email address")
      .test("is-email", "Invalid email address", value => isEmail(`${value}`))
      .max(100, `The email address should contain up to 100 characters`)
      .trim()
      .required("required"),

    companyOccupation: string()
      .test("is-company-subject", "Hebrew or English only", value => isAlphanumeric(`${value}`, 'en-US', { ignore: ' ' }) || isAlphanumeric(`${value}`, 'he', { ignore: ' ' }))
      .max(100, "The company's occupation should be up to 100 characters")
      .min(2, "The company's occupation should be at least 2 characters")
      .trim()
      .required("required"),


    vatNumber: string()
      .test("is-number", `Only numbers are required`, value => /^\d+$/.test(value as string))
      .max(9, `Up to 9 characters`)
      .min(8, `At least 8 characters`)
      .trim()
      .required("required"),


    phonePersonal: string()
      .test("is-personal-phone", `Israel or USA format only`, value => isMobilePhone(`${value}`, ['he-IL', 'en-US']))
      .trim()
      .required("required"),

    faxNumber: string()
      .test("is-fax-number", "Invalid fax number", value => /^\d+$/.test(value as string))
      .trim()
      .required("required"),

    companyAddress: string()
      .max(100, "Up to 100 characters")
      .min(2, "At least 2 characters")
      .trim()
      .required("required"),
  }),

  products: array(
    object({
      itemName: string().trim().required(),
      color: string().trim().required(),
    })),

  owners: array(
    object({
      firstName: string()
        .test("is-first-name", "Hebrew or English only", value => isAlpha(`${value}`, 'en-US', { ignore: ' ' }) || isAlpha(`${value}`, 'he', { ignore: ' ' }))
        .max(30, "Up to 30 characters")
        .min(1, "At least one character")
        .trim()
        .required("required"),

      lastName: string()
        .test("is-last-name", "Hebrew or English only", value => isAlpha(`${value}`, 'en-US', { ignore: ' ' }) || isAlpha(`${value}`, 'he', { ignore: ' ' }))
        .max(30, "Up to 30 characters")
        .min(1, "At least one character")
        .trim()
        .required("required"),
    })
  ),

  signerName: string()
    .min(2, "At least two characters")
    .max(30, "Up to 30 characters")
    .trim()
    .required("required"),

  message: string().max(300, "message should not exceed 300 characters").trim(),
})
