import './homePage.scss'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AiOutlineUserDelete } from "react-icons/ai";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { RiDeleteBinLine } from "react-icons/ri";
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import dayjs, { Dayjs } from 'dayjs';
import isAlpha from "validator/lib/isAlpha";
import isAlphanumeric from "validator/lib/isAlphanumeric";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import logo from 'assets/logo.webp'
import TextField from '@mui/material/TextField';
import UseWindowSize from 'common/hooks/UseWindowsSize';



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


interface FormValues {
  date: string
  businessDetails: {
    companyName: string;
    companyPhone: string;
    email: string;
    companyOccupation: string;
    bnNumber: string;
    phonePersonal: string;
    faxNumber: string;
    companyAddress: string;
  }
  descriptionOfTheRequest: IAddProduct[];
  owners: IAddOwner[]
  array: string[];
  signerName: string;
  message: string;
};


const HomePage = () => {
  const [, screenWidth] = UseWindowSize();
  const [value, setValue] = useState<Dayjs | null>(
    dayjs(new Date()),
  );

  useEffect(() => {
    addProduct();
    addOwner();
  }, [])

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  // FORM SCHEMA WITH YUP
  const formSchema = Yup.object({
    date: Yup.string().required(),

    businessDetails: Yup.object({
      companyName: Yup.string()
        .test("is-company-name", "The company's name should be in Hebrew or English.", value => isAlphanumeric(`${value}`, 'en-US', { ignore: ' ' }) || isAlphanumeric(`${value}`, 'he', { ignore: ' ' }))
        .max(50, "The company name should be max 50 characters.")
        .min(1, "The company name should by a minimum 1 character.")
        .required("A company name is required."),

      companyPhone: Yup.string()
        .test("is-phone", "The company's phone should be in Israel or USA format.", value => isMobilePhone(`${value}`, ['he-IL', 'en-US']))
        .required("The company's phone is required."),

      email: Yup.string()
        .email("Invalid email address.")
        .test("is-email", "Invalid email address.", value => isEmail(`${value}`))
        .max(100, "Email address should be maxed 100 characters.")
        .required("Email address is required."),

      companyOccupation: Yup.string()
        .max(100, "The company's Occupation should be maxed of 100 characters.")
        .min(2, "The company's Occupation should be minimum of 2 characters.")
        .required("Company's Occupation is required."),


      bnNumber: Yup.string()
        .test("is-number", "bnNumber should be number", value => /^\d+$/.test(value as string))
        .max(9, "bnNumber should be maxed  100 characters.")
        .min(8, "bnNumber should be minimum 2 characters.")
        .required("bnNumber is required."),


      phonePersonal: Yup.string()
        .test("is-personal-phone", "A phone number should be in Hebrew or English format.", value => isMobilePhone(`${value}`, ['he-IL', 'en-US']))
        .required("A phone number is required."),

      faxNumber: Yup.string()
        .test("is-fax-number", "The fax number should be in Hebrew or English format.", value => /^\d+$/.test(value as string))
        .required("A fax number is required."),

      companyAddress: Yup.string()
        .max(100, "The company's address should be maxed 100 characters.")
        .min(2, "The company's address should be a minimum of 2 characters.")
        .required("The company's address is required."),
    }),

    descriptionOfTheRequest: Yup.array(
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
          .test("is-first-name", "The first name should be in Hebrew or English.", value => isAlpha(`${value}`, 'en-US', { ignore: ' ' }) || isAlpha(`${value}`, 'he', { ignore: ' ' }))
          .max(30, "The first name should be max 30 characters.")
          .min(1, "The first name should be a minimum 1 character.")
          .required("First name is required."),

        lastName: Yup.string()
          .test("is-last-name", "The last name should be in Hebrew or English.", value => isAlpha(`${value}`, 'en-US', { ignore: ' ' }) || isAlpha(`${value}`, 'he', { ignore: ' ' }))
          .max(30, "The last name should max be 30 characters.")
          .min(1, "The last name should minimum be 1 character.")
          .required("Last name is required."),
      })
    ),

    array: Yup.string().optional(),
    signerName: Yup.string().min(1).max(30).required(),
    message: Yup.string().max(300).optional(),
  })

  // useForm Will help us managing the form properties
  const { control, register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
    resolver: yupResolver(formSchema) // resolver for yup to work with react-hook-form
  });

  const { fields, prepend, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "descriptionOfTheRequest", // The name of the array
  });

  const { fields: fieldsss, prepend: add, remove: removee } = useFieldArray({
    control,
    name: "owners",
  });

  /* onSubmit form */
  const onSubmit = handleSubmit(async (data: FormValues) => {

    for (let i = 0; i < data.descriptionOfTheRequest.length; i++) {
      const { amount, color, itemName, size } = data.descriptionOfTheRequest[i]
      if (!amount || !color || !itemName || !size) { // if one property of the rublica is empty.
        data.descriptionOfTheRequest.splice(i, 1)
      }
    }


    for (let i = 0; i < data.owners.length; i++) {
      const { firstName, lastName } = data.owners[i]
      if (!firstName || !lastName) { // if one property of the rublica is empty.
        data.owners.splice(i, 1)
      }
    }

    data.array = data.descriptionOfTheRequest.map((item, index) => {
      return `${index} - item name: ${item.itemName}, size: ${item.size}, color: ${item.color}, amount:${item.amount} `
    })
    console.log(data);
  })


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

        {/* Page Header */}
        <header className="golden-tape-form-header">
          <img src={logo} alt="" />
          <h1>Golden Tape Ltd</h1>
          <h2>טופס לקוח חדש</h2>
        </header>

        {/* Form */}
        <form onSubmit={onSubmit} autoComplete="off">

          {/* Business Details Section */}
          <div className="business-details-container">

            <header className='business-details-header'>
              <h3>פרטי העסק</h3>
              <div className="form-control">
                <label htmlFor="date">תאריך</label>

                {screenWidth < 500 ? <>
                  <MobileDatePicker
                    inputFormat="DD/MM/YYYY"
                    value={value}
                    closeOnSelect={true}
                    onChange={handleChange}
                    className="form-control-date"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </> :
                  <>
                    <DesktopDatePicker
                      inputFormat="DD/MM/YYYY"
                      value={value}
                      closeOnSelect={false}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </>}
              </div>
            </header>

            <div className="white-container">

              {/* COMPANY NAME */}
              <div className="form-control">
                <label htmlFor="companyName">שם החברה</label>
                <input id="companyName" {...register("businessDetails.companyName")} />
              </div>


              {/* COMPANY ADDRESS */}
              <div className="form-control">
                <label htmlFor="companyAddress">כתובת</label>
                <input id="companyAddress" {...register('businessDetails.companyAddress')} />
              </div>


              {/* VAT NUMBER */}
              <div className="form-control">
                <label htmlFor="bnNumber">ח.פ / עוסק מורשה</label>
                <input id="bnNumber" {...register('businessDetails.bnNumber')} />
              </div>


              {/* COMPANY PHONE */}
              <div className="form-control">
                <label htmlFor="companyPhone">מספר טלפון</label>
                <input id="companyPhone" {...register('businessDetails.companyPhone')} />
              </div>


              {/* PHONE PERSONAL */}
              <div className="form-control">
                <label htmlFor="phonePersonal">מספר סלולרי</label>
                <input id="phonePersonal" {...register('businessDetails.phonePersonal')} />
              </div>

              {/* FAX NUMBER */}
              <div className="form-control">
                <label htmlFor="faxNumber">מספר פקס</label>
                <input id="faxNumber" {...register('businessDetails.faxNumber')} />
              </div>

              {/* EMAIL */}
              <div className="form-control">
                <label htmlFor="email">כתובת אימייל</label>
                <input id="email" type="email" {...register('businessDetails.email')} />
              </div>


              {/* COMPANY OCCUPATION */}
              <div className="form-control">
                <label htmlFor="companyOccupation">עיסוק</label>
                <input id="companyOccupation" {...register('businessDetails.companyOccupation')} />
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
                  <td><input style={{ width: '100%' }} autoComplete="new-password" {...register(`owners.${index}.firstName`)} /></td>
                  <td> <input style={{ width: '100%' }} autoComplete="new-password" {...register(`owners.${index}.lastName`)} /></td>
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
                      <input id="itemName" {...register(`descriptionOfTheRequest.${index}.itemName`)} />
                    </div>

                    <div className="form-control">
                      <label htmlFor="color">צבע</label>
                      <input id="color" {...register(`descriptionOfTheRequest.${index}.color`)} />
                    </div>

                    <div className="form-control">
                      <label htmlFor="size">מידה</label>
                      <input id="size" {...register(`descriptionOfTheRequest.${index}.size`)} />
                    </div>

                    <div className="form-control">
                      <label htmlFor="kind">סוג</label>
                      <select id="kind" {...register(`descriptionOfTheRequest.${index}.kind`)}>
                        <option value="קרטונים">קרטונים</option>
                        <option value="גלילים">גלילים</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label htmlFor="amount">כמות</label>
                      <input type="number" id="amount" {...register(`descriptionOfTheRequest.${index}.amount`)} />
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
                    <td><input type="number" {...register(`descriptionOfTheRequest.${index}.amount`)} /></td>
                    <td><textarea {...register(`descriptionOfTheRequest.${index}.size`)} /></td>
                    <td><textarea {...register(`descriptionOfTheRequest.${index}.color`)} /></td>
                    <td><textarea {...register(`descriptionOfTheRequest.${index}.itemName`)} /></td>
                    <td><textarea {...register(`descriptionOfTheRequest.${index}.kind`)} /></td>
                    <td className="remove-trash-td"><RiDeleteBinLine onClick={() => removeProduct(index)} className='remove-trash-icon' /></td>
                  </tr>
                ))}
              </table>
              <button type="button" className="add-product" onClick={() => addProduct()}>הוסף מוצר</button>
            </div>
          </>}

          <footer className="form-footer">
            {/* Signer's name */}
            <div className="form-control">
              <label htmlFor="signerName">שם ממלא הטופס</label>
              <input id="signerName" {...register('signerName')} />
            </div>

            {/* Message */}
            <div className="form-control">
              <label htmlFor="message">הערות</label>
              <textarea className="message" id="message" {...register('message')} />
            </div>
          </footer>

          {/* SUBMIT BUTTON */}
          <button type="submit" className="submit">SUBMIT</button>
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