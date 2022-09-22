import './homePage.scss'
import { AiOutlineUserDelete } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { useEffect, useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import isAlpha from "validator/lib/isAlpha";
import isAlphanumeric from "validator/lib/isAlphanumeric";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import logo from '../../assets/logo.svg'
import UseWindowSize from 'common/hooks/UseWindowsSize';
import { FormValues } from 'common/interface';
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';


const HomePage = () => {
  const [, screenWidth] = UseWindowSize();
  const form = useRef<any>()




  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs('2014-08-18T21:11:54'),
  );

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };



  useEffect(() => {
    addProduct();
    addOwner();
  }, [])


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
  const { control, register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: yupResolver(formSchema) // resolver for yup to work with react-hook-form
  });

  console.log((watch("dateOfSubmit")));


  const { fields, prepend, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "products", // The name of the array
  });

  const { fields: fieldsss, prepend: add, remove: removee } = useFieldArray({
    control,
    name: "owners",
  });

  /* onSubmit form */
  const onSubmit = handleSubmit(async (data: FormValues) => {

    console.log(value);

    // @ts-ignore
    // data.date = value?.$d

    console.log("onSubmit ~ data", data)

  })

  // }).catch(() => handelFormSubmissionError())

  const addOwner = () => {
    add({
      firstName: "",
      lastName: "",
    })
  }


  const removeOwner = (index: number) => {
    removee(index)
  }

  const addProduct = () => {
    prepend({
      itemName: "",
      color: "",
      amount: "",
      size: "",
      kind: ""
    })
  }

  const removeProduct = (index: number) => {
    remove(index)
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="golden-tape-form-container">

        <header className="golden-tape-form-header">
          <img src={logo} alt="" />
          <h2>טופס בקשה להצעת מחיר</h2>
        </header>

        {/* Form */}
        <form ref={form} onSubmit={onSubmit} autoComplete="off">

          {/* Business Details Section */}
          <div className="business-details-container">

            <header className='business-details-header'>
              <h3>פרטי העסק</h3>
              <div className="form-control">
                <label htmlFor="date">תאריך</label>
                {screenWidth < 500 ? <>
                  <MobileDatePicker
                    {...register("dateOfSubmit")}
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </> :
                  <>
                    <DesktopDatePicker
                      {...register("dateOfSubmit")}
                      inputFormat="MM/DD/YYYY"
                      value={value}
                      onChange={(value) => setValue(value)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </>}
                <p className="error">{errors.dateOfSubmit?.message}</p>
              </div>
            </header>

            <div className="white-container">

              {/* COMPANY NAME */}
              <div className="form-control">
                <label htmlFor="companyName">שם החברה</label>
                <input id="companyName" {...register("businessDetails.companyName")} />
                <p className="error">{errors.businessDetails?.companyName?.message}</p>
              </div>


              {/* COMPANY ADDRESS */}
              <div className="form-control">
                <label htmlFor="companyAddress">כתובת</label>
                <input id="companyAddress" {...register('businessDetails.companyAddress')} />
                <p className="error">{errors.businessDetails?.companyAddress?.message}</p>
              </div>


              {/* VAT NUMBER */}
              <div className="form-control">
                <label htmlFor="vatNumber">ח.פ / עוסק מורשה</label>
                <input id="vatNumber" type='tel' {...register('businessDetails.vatNumber')} />
                <p className="error">{errors.businessDetails?.vatNumber?.message}</p>
              </div>


              {/* COMPANY PHONE */}
              <div className="form-control">
                <label htmlFor="companyPhone">מספר טלפון</label>
                <input id="companyPhone" type='tel' {...register('businessDetails.companyPhone')} />
                <p className="error">{errors.businessDetails?.companyPhone?.message}</p>
              </div>


              {/* PHONE PERSONAL */}
              <div className="form-control">
                <label htmlFor="phonePersonal">מספר סלולרי</label>
                <input id="phonePersonal" type='tel' {...register('businessDetails.phonePersonal')} />
                <p className="error">{errors.businessDetails?.phonePersonal?.message}</p>
              </div>


              {/* FAX NUMBER */}
              <div className="form-control">
                <label htmlFor="faxNumber">מספר פקס</label>
                <input id="faxNumber" type='tel' {...register('businessDetails.faxNumber')} />
                <p className="error">{errors.businessDetails?.faxNumber?.message}</p>
              </div>


              {/* EMAIL */}
              <div className="form-control">
                <label htmlFor="email">כתובת אימייל</label>
                <input id="email" type="email" {...register('businessDetails.email')} />
                <p className="error">{errors.businessDetails?.email?.message}</p>
              </div>


              {/* COMPANY OCCUPATION */}
              <div className="form-control">
                <label htmlFor="companyOccupation">עיסוק</label>
                <input id="companyOccupation" {...register('businessDetails.companyOccupation')} />
                <p className="error">{errors.businessDetails?.companyOccupation?.message}</p>
              </div>
            </div>
          </div>


          {/* Owners details */}
          <h3>פרטי בעל\י החברה</h3>
          <div className="white-container">
            <table>
              <tr>
                <th>שם משפחה</th>
                <th>שם פרטי</th>
              </tr>
              {fieldsss.map((field, index) => (
                <tr key={field.id}>
                  <td>
                    <input style={{ width: '100%' }} autoComplete="new-password" {...register(`owners.${index}.firstName`)} />
                    <p className="error">{errors?.owners && errors?.owners[index]?.firstName?.message}</p>
                  </td>
                  <td>
                    <input style={{ width: '100%' }} autoComplete="new-password" {...register(`owners.${index}.lastName`)} />
                    <p className="error">{errors?.owners && errors?.owners[index]?.lastName?.message}</p>
                  </td>
                  <td className="remove-trash-td"><AiOutlineUserDelete onClick={() => removeOwner(index)} className='remove-trash-icon' /></td>
                </tr>
              ))}
            </table>
            <button type="button" className="add-product" onClick={() => addOwner()}>הוסף בעלים</button>
          </div>


          {/* DESCRIPTION OF THE REQUEST SECTION */}
          {screenWidth < 500 ? <>
            <h3>תיאור הבקשה</h3>
            <div className="description-of-the-request-container white-container">

              {fields.map((field, index) => (
                <>
                  {/* SMALL SCREENS */}
                  <div key={field.id} className="products-list-for-small-screens">

                    <div className="form-control">
                      <label htmlFor="itemName">מוצר</label>
                      <input id="itemName" {...register(`products.${index}.itemName`)} />
                    </div>

                    <div className="form-control">
                      <label htmlFor="color">צבע</label>
                      <input id="color" {...register(`products.${index}.color`)} />
                    </div>

                    <div className="form-control">
                      <label htmlFor="size">מידה</label>
                      <input id="size" {...register(`products.${index}.size`)} />
                    </div>

                    <div className="form-control">
                      <label htmlFor="kind">סוג</label>
                      <select id="kind" {...register(`products.${index}.kind`)}>
                        <option value="קרטונים">קרטונים</option>
                        <option value="גלילים">גלילים</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label htmlFor="amount">כמות</label>
                      <input type="number" id="amount" {...register(`products.${index}.amount`)} />
                    </div>

                    <td className="remove-trash-td"><RiDeleteBinLine onClick={() => removeProduct(index)} className='remove-trash-icon' /></td>
                  </div>
                </>
              ))}
              <button type="button" className="add-product" onClick={() => addProduct()}>הוסף מוצר</button>
            </div>

          </> : <>
            <h3>תיאור הבקשה</h3>
            <div className="white-container">
              <table>
                <tr>
                  <th>כמות</th>
                  <th>סוג</th>
                  <th>מידה</th>
                  <th>צבע</th>
                  <th>מוצר</th>
                </tr>
                {fields.map((field, index) => (
                  <tr key={field.id}>
                    <td>
                      <input type="number" {...register(`products.${index}.amount`)} />
                      <p className="error">{errors?.products && errors?.products[index]?.amount?.message}</p>
                    </td>
                    <td><textarea {...register(`products.${index}.size`)} /></td>
                    <td><textarea {...register(`products.${index}.color`)} /></td>
                    <td><textarea {...register(`products.${index}.itemName`)} /></td>
                    <td>
                      <select id="kind" {...register(`products.${index}.kind`)}>
                        <option value="קרטונים">קרטונים</option>
                        <option value="גלילים">גלילים</option>
                      </select>
                    </td>

                    <td className="remove-trash-td"><RiDeleteBinLine onClick={() => removeProduct(index)} className='remove-trash-icon' /></td>
                  </tr>
                ))}
              </table>
              <button type="button" className="add-product" onClick={() => addProduct()}>הוסף מוצר</button>
            </div>
          </>}


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