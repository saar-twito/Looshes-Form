import * as Yup from 'yup';
import isEmail from "validator/lib/isEmail";
import isAlpha from "validator/lib/isAlpha";
import isAlphanumeric from "validator/lib/isAlphanumeric";
import isMobilePhone from "validator/lib/isMobilePhone";
import { useFieldArray, useForm } from 'react-hook-form';
import logo from 'assets/logo.webp'
import { yupResolver } from '@hookform/resolvers/yup';
import './homePage.scss'
import { useEffect } from 'react';


interface ITest {
  itemName: "",
  color: "#f6b73c",
  amount: "",
  size: ""
}

// ALL THE FORM FIELDS
interface FormValues {
  date: string
  businessDetails: {
    companyName: string;
    firstName: string;
    companyPhone: string;
    email: string;
    companyOccupation: string;
    bnNumber: string;
    lastName: string;
    phonePersonal: string;
    faxNumber: string;
    companyAddress: string;
  }
  descriptionOfTheRequest: ITest[],
  array: string[];
};


const HomePage = () => {
  useEffect(() => appendToList(), [])

  // FORM SCHEMA WITH YUP
  const formSchema = Yup.object({
    date: Yup.string().required(),

    businessDetails: Yup.object({
      companyName: Yup.string()
        .test("is-company-name", "The company's name should be in Hebrew or English.", value => isAlphanumeric(`${value}`, 'en-US', { ignore: ' ' }) || isAlphanumeric(`${value}`, 'he', { ignore: ' ' }))
        .max(50, "The company name should be max 50 characters.")
        .min(1, "The company name should by a minimum 1 character.")
        .required("A company name is required."),

      firstName: Yup.string()
        .test("is-name", "The first name should be in Hebrew or English.", value => isAlpha(`${value}`, 'en-US', { ignore: ' ' }) || isAlpha(`${value}`, 'he', { ignore: ' ' }))
        .max(30, "The first name should be max 30 characters.")
        .min(1, "The first name should be a minimum 1 character.")
        .required("First name is required."),


      lastName: Yup.string()
        .test("is-name", "The last name should be in Hebrew or English.", value => isAlpha(`${value}`, 'en-US', { ignore: ' ' }) || isAlpha(`${value}`, 'he', { ignore: ' ' }))
        .max(30, "The last name should max be 30 characters.")
        .min(1, "The last name should minimum be 1 character.")
        .required("Last name is required."),

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

    array: Yup.string().optional(),
  })

  // useForm Will help us managing the form properties
  const { control, register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(formSchema) // resolver for yup to work with react-hook-form
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "descriptionOfTheRequest", // The name of the array
  });

  /* onSubmit form */
  const onSubmit = handleSubmit(async (data: FormValues) => {
    for (let i = 0; i < data.descriptionOfTheRequest.length; i++) {
      const { amount, color, itemName, size } = data.descriptionOfTheRequest[i]
      if (!amount || !color || !itemName || !size) { // if one property of the rublica is empty.
        data.descriptionOfTheRequest.splice(i, 1)
      }
    }
    data.array = data.descriptionOfTheRequest.map((item, index) => {
      return `${index} - item name: ${item.itemName}, size: ${item.size}, color: ${item.color}, amount:${item.amount} `
    })
    console.log(data.array);
  })


  const appendToList = () => {
    prepend({
      itemName: "",
      color: "#f6b73c",
      amount: "",
      size: ""
    })
  }

  const removeFromList = (index: number) => {
    remove(index)
  }

  return (
    <div className="golden-tape-form-continuer">

      {/* Page Header */}
      <header className="golden-tape-form-header">
        <img src={logo} alt="" />
        <h1>Golden Tape Ltd</h1>
        <h2>טופס לקוח חדש</h2>
      </header>

      {/* Form */}
      <form onSubmit={onSubmit}>

        {/* Business Details Section */}
        <div className="business-details-continuer">

          <header className='business-details-header'>
            <h3>פרטי העסק</h3>
            <div className="form-control">
              <label htmlFor="date">תאריך</label>
              <input id="date" type="date" placeholder='date' {...register('date')} />
            </div>
          </header>

          <div className="rest-of-the-business-details-section">

            {/* COMPANY NAME */}
            <div className="form-control">
              <label htmlFor="companyName">שם העסק</label>
              <input id="companyName" {...register("businessDetails.companyName")} />
            </div>

            {/* VAT NUMBER */}
            <div className="form-control">
              <label htmlFor="bnNumber">ח.פ / עוסק מורשה</label>
              <input id="bnNumber" {...register('businessDetails.bnNumber')} />
            </div>

            {/* COMPANY PHONE */}
            <div className="form-control">
              <label htmlFor="companyPhone">פלאפון חברה</label>
              <input id="companyPhone" {...register('businessDetails.companyPhone')} />
            </div>


            {/* COMPANY OCCUPATION */}
            <div className="form-control">
              <label htmlFor="companyOccupation">עיסוק החברה</label>
              <input id="companyOccupation" {...register('businessDetails.companyOccupation')} />
            </div>

            {/* COMPANY ADDRESS */}
            <div className="form-control">
              <label htmlFor="companyAddress">כתובת החברה</label>
              <input id="companyAddress" {...register('businessDetails.companyAddress')} />
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


            {/* PHONE PERSONAL */}
            <div className="form-control">
              <label htmlFor="phonePersonal">מספר סלולרי</label>
              <input id="phonePersonal" {...register('businessDetails.phonePersonal')} />
            </div>

          </div>

        </div>


        {/* DESCRIPTION OF THE REQUEST SECTION */}
        <div className="description-of-the-request-continuer">
          <header>
            <h3>תיאור הבקשה</h3>
          </header>
          <table>
            <tr>
              <th>מוצר</th>
              <th>צבע</th>
              <th>מידה</th>
              <th>כמות</th>
            </tr>
            <tr>
              <td><textarea /></td>
              <td><input type="color" /></td>
              <td><textarea /></td>
              <td><input type="number" /></td>
              <td>X</td>
            </tr>
          </table>
        </div>

      </form>
      {/* <form onSubmit={onSubmit}>

        <div className="form-control">
          <label htmlFor="firstName"></label>
          <input id="firstName" placeholder='firstName' {...register('businessDetails.firstName')} />
        </div>

        <div className="form-control">
          <label htmlFor="lastName"></label>
          <input id="lastName" placeholder='lastName' {...register('businessDetails.lastName')} />
        </div>







        {fields.map((field, index) => (
          <div key={field.id} className="rublica-wrapper">

            <div className="form-control">
              <label htmlFor={`itemName${index}`}></label>
              <input id={`itemName${index}`} placeholder='itemName' {...register(`descriptionOfTheRequest.${index}.itemName`)} />
            </div>


            <div className="form-control">
              <label htmlFor={`color${index}`}></label>
              <input id={`color${index}`} value="#f6b73c" type="color" {...register(`descriptionOfTheRequest.${index}.color`)} />
            </div>


            <div className="form-control">
              <label htmlFor={`amount${index}`}></label>
              <input id={`amount${index}`} placeholder='amount' type="number"  {...register(`descriptionOfTheRequest.${index}.amount`)} />
            </div>

            <div className="form-control">
              <label htmlFor={`size${index}`}></label>
              <input id={`size${index}`} placeholder='size' {...register(`descriptionOfTheRequest.${index}.size`)} />
            </div>

            <button type="button" className='remove-button' onClick={() => removeFromList(index)}>Remove</button>
          </div>
        ))}

        <div className="form-control">
          <label style={{ visibility: 'hidden' }} htmlFor="array"></label>
          <input style={{ visibility: 'hidden' }} id="array" placeholder='array' {...register('array')} />
        </div>

        <div className="buttons">
          <button type="submit" className="submit">Submit</button>
          <button type="button" className="add" onClick={() => appendToList()}>Add product</button>
        </div>
      </form> */}
    </div>
  )
}

export default HomePage