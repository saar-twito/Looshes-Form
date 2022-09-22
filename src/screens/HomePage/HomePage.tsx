import './homePage.scss'

import { RiDeleteBinLine } from "react-icons/ri";
import { useEffect, useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import isAlpha from "validator/lib/isAlpha";
import isAlphanumeric from "validator/lib/isAlphanumeric";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import { FormValues } from 'common/interface';
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import BusinessDetails from 'components/Form/BusinessDetails/BusinessDetails';
import Header from 'components/Header/Header';
import CompanyOwnerDetails from 'components/Form/CompanyOwnerDetails/CompanyOwnerDetails';
import ListOfProducts from 'components/Form/ListOfProducts/ListOfProducts';


const HomePage = () => {
  const form = useRef<any>()


  const [date, setDate] = React.useState<Dayjs | null>(dayjs(new Date()));

  const handleChange = (newValue: Dayjs | null) => {
    setDate(newValue);
  };






  // FORM SCHEMA WITH YUP
  const formSchema = Yup.object({
    dateOfSubmit: Yup.string().required(),

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
        .test("is-fax-number", "מספר פקס לא חוקי", value => /^\d+$/.test(value as string))
        .required("נדרש למלא"),

      companyAddress: Yup.string()
        .max(100, "עד 100 תווים")
        .min(2, "לפחות 2 תווים")
        .required("נדרש למלא"),
    }),

    products: Yup.array(
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

    signerName: Yup.string()
      .min(2, "לפחות שני תווים")
      .max(30, "עד 30 תווים")
      .required("נדרש למלא"),

    message: Yup.string().max(300).optional(),
  })

  // useForm Will help us managing the form properties
  const { control, register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: yupResolver(formSchema) // resolver for yup to work with react-hook-form
  });




  /* onSubmit form */
  const onSubmit = handleSubmit(async (data: FormValues) => {

    // @ts-ignore // =?! DON'T REMOVE IT
    data.dateOfSubmit = date?.$d
    console.log("onSubmit ~ data", data)
  })

  // }).catch(() => handelFormSubmissionError())




  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="golden-tape-form-container">

        <Header />

        {/* Form */}
        <form ref={form} onSubmit={onSubmit} autoComplete="off">

          {/* Business Details Section */}
          <BusinessDetails
            register={register}
            errors={errors}
            date={date}
            handleChange={handleChange} />


          {/* Owners details */}
          <CompanyOwnerDetails control={control} register={register} errors={errors} />


          {/* DESCRIPTION OF THE REQUEST SECTION */}
          <ListOfProducts control={control} register={register} errors={errors} />

          <h3>שם ממלא הטופס</h3>
          <footer className="white-container">
            {/* Signer's name */}
            <div className="form-control">
              <label htmlFor="signerName">שם מלא</label>
              <input id="signerName" {...register('signerName')} />
              <p className="error">{errors.signerName?.message}</p>
            </div>

            {/* Message */}
            <div className="form-control">
              <label htmlFor="message">הערות</label>
              <textarea className="message" id="message" {...register('message')} />
            </div>
          </footer>

          {/* SUBMIT BUTTON */}
          <button type="submit" className="submit">שלח</button>
        </form>

        {/* <div className="form-control">
    <label style={{ visibility: 'hidden' }} htmlFor="array"></label>
    <input style={{ visibility: 'hidden' }} id="array" placeholder='array' {...register('array')} />
  </div>  */}
      </div>
    </LocalizationProvider>


  )
}

export default HomePage