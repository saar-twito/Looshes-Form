import * as Yup from 'yup';
import isAlpha from "validator/lib/isAlpha";
import isAlphanumeric from "validator/lib/isAlphanumeric";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";

// FORM SCHEMA WITH YUP
export const formSchema = Yup.object({
  date: Yup.string().required(),

  businessDetails: Yup.object({
    companyName: Yup.string()
      .test("is-company-name", "עברית או אנגלית בלבד", value => isAlphanumeric(`${value}`, 'en-US', { ignore: ' ' }) || isAlphanumeric(`${value}`, 'he', { ignore: ' ' }))
      .max(50, "שם החברה צריך להכיל עד 50 תווים")
      .min(1, "שם החברה צריך להיות בעל תו אחד לפחות")
      .required("נדרש למלא"),

    companyPhone: Yup.string()
      .test("is-phone", `פורמט ישראל או ארה"ב בלבד`, value => isMobilePhone(`${value}`, ['he-IL', 'en-US']))
      .required("נדרש למלא"),

    email: Yup.string()
      .email("כתובת אימייל לא חוקית")
      .test("is-email", "כתובת אימייל לא חוקית", value => isEmail(`${value}`))
      .max(100, `כתובת הדוא"ל צריכה להכיל עד 100 תווים`)
      .required("נדרש למלא"),

    companyOccupation: Yup.string()
      .test("is-company-subject", "עברית או אנגלית בלבד", value => isAlphanumeric(`${value}`, 'en-US', { ignore: ' ' }) || isAlphanumeric(`${value}`, 'he', { ignore: ' ' }))
      .max(100, "העיסוק של החברה צריך להיות עד 100 תווים")
      .min(2, "העיסוק של החברה צריך להיות לפחות 2 תווים.")
      .required("נדרש למלא"),


    vatNumber: Yup.string()
      .test("is-number", `רק מספרים נדרשים`, value => /^\d+$/.test(value as string))
      .max(9, `עד 9 תווים`)
      .min(8, `לפחות 8 תווים`)
      .required("נדרש למלא"),


    phonePersonal: Yup.string()
      .test("is-personal-phone", `פורמט ישראל או ארה"ב בלבד`, value => isMobilePhone(`${value}`, ['he-IL', 'en-US']))
      .required("נדרש למלא"),

    faxNumber: Yup.string()
      .test("is-fax-number", "מספר פקס לא חוקי", value => isMobilePhone(`${value}`, ['he-IL', 'en-US']))
      .required("נדרש למלא"),

    companyAddress: Yup.string()
      .max(100, "עד 100 תווים")
      .min(2, "לפחות 2 תווים")
      .required("נדרש למלא"),
  }),

  product: Yup.array(
    Yup.object({
      itemName: Yup.string().optional(),
      color: Yup.string().optional(),
      amount: Yup.string().optional(),
      size: Yup.string().optional()
    })
  ),

  owners: Yup.array(
    Yup.object({
      firstName: Yup.string()
        .test("is-first-name", "עברית או אנגלית בלבד", value => isAlpha(`${value}`, 'en-US', { ignore: ' ' }) || isAlpha(`${value}`, 'he', { ignore: ' ' }))
        .max(30, "עד 30 תווים")
        .min(1, "לפחות תו אחד")
        .required("נדרש למלא"),

      lastName: Yup.string()
        .test("is-last-name", "עברית או אנגלית בלבד", value => isAlpha(`${value}`, 'en-US', { ignore: ' ' }) || isAlpha(`${value}`, 'he', { ignore: ' ' }))
        .max(30, "עד 30 תווים")
        .min(1, "לפחות תו אחד")
        .required("נדרש למלא"),
    })
  ),

  sumUp: Yup.string().optional(),
  signerName: Yup.string()
    .min(2, "לפחות שני תווים")
    .max(30, "עד 30 תווים")
    .required("נדרש למלא"),
  message: Yup.string().max(300).optional(),
})