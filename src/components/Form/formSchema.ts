import isAlpha from "validator/lib/isAlpha";
import isAlphanumeric from "validator/lib/isAlphanumeric";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import { array, object, string } from 'yup';

export const formSchema = object({
  dateOfSubmit: string().required(),

  businessDetails: object({
    companyName: string()
      .test("is-company-name", "עברית או אנגלית בלבד", value => isAlphanumeric(`${value}`, 'en-US', { ignore: ' ' }) || isAlphanumeric(`${value}`, 'he', { ignore: ' ' }))
      .max(50, "שם החברה צריך להכיל עד 50 תווים")
      .min(1, "שם החברה צריך להיות בעל תו אחד לפחות")
      .trim()
      .required("נדרש למלא")
      .label("dshdkjsdks"),

    companyPhone: string()
      .test("is-phone", `פורמט ישראל או ארה"ב בלבד`, value => isMobilePhone(`${value}`, ['he-IL', 'en-US']))
      .trim()
      .required("נדרש למלא"),

    email: string()
      .email("כתובת אימייל לא חוקית")
      .test("is-email", "כתובת אימייל לא חוקית", value => isEmail(`${value}`))
      .max(100, `כתובת הדוא"ל צריכה להכיל עד 100 תווים`)
      .trim()
      .required("נדרש למלא"),

    companyOccupation: string()
      .test("is-company-subject", "עברית או אנגלית בלבד", value => isAlphanumeric(`${value}`, 'en-US', { ignore: ' ' }) || isAlphanumeric(`${value}`, 'he', { ignore: ' ' }))
      .max(100, "העיסוק של החברה צריך להיות עד 100 תווים")
      .min(2, "העיסוק של החברה צריך להיות לפחות 2 תווים.")
      .trim()
      .required("נדרש למלא"),


    vatNumber: string()
      .test("is-number", `רק מספרים נדרשים`, value => /^\d+$/.test(value as string))
      .max(9, `עד 9 תווים`)
      .min(8, `לפחות 8 תווים`)
      .trim()
      .required("נדרש למלא"),


    phonePersonal: string()
      .test("is-personal-phone", `פורמט ישראל או ארה"ב בלבד`, value => isMobilePhone(`${value}`, ['he-IL', 'en-US']))
      .trim()
      .required("נדרש למלא"),

    faxNumber: string()
      .test("is-fax-number", "מספר פקס לא חוקי", value => /^\d+$/.test(value as string))
      .trim()
      .required("נדרש למלא"),

    companyAddress: string()
      .max(100, "עד 100 תווים")
      .min(2, "לפחות 2 תווים")
      .trim()
      .required("נדרש למלא"),
  }),

  products: array(
    object({
      itemName: string().optional().trim(),
      color: string().optional().trim(),
      amount: string().optional(),
      size: string().optional().trim()
    })
  ),

  owners: array(
    object({
      firstName: string()
        .test("is-first-name", "עברית או אנגלית בלבד", value => isAlpha(`${value}`, 'en-US', { ignore: ' ' }) || isAlpha(`${value}`, 'he', { ignore: ' ' }))
        .max(30, "עד 30 תווים")
        .min(1, "לפחות תו אחד")
        .trim()
        .required("נדרש למלא"),

      lastName: string()
        .test("is-last-name", "עברית או אנגלית בלבד", value => isAlpha(`${value}`, 'en-US', { ignore: ' ' }) || isAlpha(`${value}`, 'he', { ignore: ' ' }))
        .max(30, "עד 30 תווים")
        .min(1, "לפחות תו אחד")
        .trim()
        .required("נדרש למלא"),
    })
  ),

  signerName: string()
    .min(2, "לפחות שני תווים")
    .max(30, "עד 30 תווים")
    .trim()
    .required("נדרש למלא"),

  message: string().max(300).optional().trim(),
})
