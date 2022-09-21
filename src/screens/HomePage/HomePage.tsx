import './homePage.scss'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AiOutlineUserDelete } from "react-icons/ai";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { formSchema } from './formSchema';
import { FormValues } from './interfaces';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs, { Dayjs } from 'dayjs';
import FormControl from 'common/FormControl/FormControl';
import logo from 'assets/logo.svg'
import TextField from '@mui/material/TextField';
import UseWindowSize from 'common/hooks/UseWindowsSize';

const HomePage = () => {
  const [isSending, setIsSending] = useState<boolean>(false)
  const [, screenWidth] = UseWindowSize();
  const [date, setOfDate] = useState<Dayjs | null>(() => dayjs(new Date()));
  const form = useRef<any>();
  const navigate = useNavigate()



  useEffect(() => {
    addProductToList();
    addOwnerToList();
  }, [])

  const handleChange = (newValue: Dayjs | null) => {
    setOfDate(newValue);
  };



  // useForm Will help us managing the form properties
  const { control, register, handleSubmit, formState: { errors, }, reset } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      date: date
    },
    resolver: yupResolver(formSchema) // resolver for yup to work with react-hook-form
  });

  const { fields: productFields, prepend: addProduct, remove: removeProduct } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "product", // The name of the array
  });

  const { fields: ownersFields, prepend: addOwner, remove: removeOwner } = useFieldArray({
    control,
    name: "owners",
  });

  /* onSubmit form */
  const onSubmit: SubmitHandler<FormValues> = (async (data) => {
    console.log("constonSubmit:SubmitHandler<FormValues>= ~ data", data)
    setIsSending(true)

    /* Date  */
    form.current[0].value = date;
    form.current[0].name = 'Date of submission';

    const handelFormSubmissionError = () => {
      toast.error("אנא צרו איתנו קשר טלפוני");
      setIsSending(false)
    };

    // fetch('https://formspree.io/f/maykelbr', {
    //   method: 'POST',
    //   // @ts-ignore
    //   body: new FormData(form.current),
    //   headers: { 'Accept': 'application/json' }
    // }).then(response => {
    //   if (response.ok) {
    //     reset();
    //     navigate(`/formSubmission`)
    //   }
    //   else handelFormSubmissionError();

    // }).catch(() => handelFormSubmissionError())

  })


  const addOwnerToList = () => {
    addOwner({
      firstName: "",
      lastName: "",
    })
  }

  const addProductToList = () => {
    addProduct({
      itemName: "",
      color: "",
      amount: "",
      size: "",
      kind: ""
    })
  }

  const removeOwnerFromList = (index: number) => removeOwner(index)
  const removeProductFromList = (index: number) => removeProduct(index)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="golden-tape-form-container">

        {/* Page Header */}
        <header className="golden-tape-form-header">
          <img src={logo} alt="" />
          <h2>טופס בקשה להצעת מחיר</h2>
        </header>

        {/* Form */}
        <form ref={form} onSubmit={handleSubmit(onSubmit)} autoComplete="off">

          {/* Business Details Section */}
          <div className="business-details-container">

            <header className='business-details-header'>
              <h3>פרטי העסק</h3>
              <div className="form-control">
                <label htmlFor="date">תאריך</label>
                {screenWidth < 500 ? <>
                  <MobileDatePicker
                    {...register("date")}
                    inputFormat="DD/MM/YYYY"
                    value={date}
                    closeOnSelect={true}
                    onChange={handleChange}
                    className="form-control-date"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </> :
                  <>
                    <DesktopDatePicker
                      {...register("date")}
                      inputFormat="DD/MM/YYYY"
                      value={date}
                      closeOnSelect={true}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </>}
                <p className="error">{errors.date?.message}</p>
              </div>
            </header>

            <div className="white-container">

              {/* COMPANY NAME */}
              <FormControl
                htmlFor='companyName'
                label='שם החברה'
                register={register}
                registerName="businessDetails.companyName"
                errorMessage={errors.businessDetails?.companyName?.message} />


              {/* COMPANY ADDRESS */}
              <FormControl
                htmlFor='companyAddress'
                label='כתובת'
                register={register}
                registerName="businessDetails.companyAddress"
                errorMessage={errors.businessDetails?.companyAddress?.message} />


              {/* VAT NUMBER */}
              <FormControl
                htmlFor='vatNumber'
                inputType='tel'
                label='ח.פ / עוסק מורשה'
                register={register}
                registerName="businessDetails.vatNumber"
                errorMessage={errors.businessDetails?.vatNumber?.message} />


              {/* COMPANY PHONE */}
              <FormControl
                htmlFor='companyPhone'
                label="(-) מספר טלפון ללא"
                register={register}
                registerName="businessDetails.companyPhone"
                inputType='tel'
                placeholder="085740487"
                errorMessage={errors.businessDetails?.companyPhone?.message} />


              {/* PHONE PERSONAL */}
              <FormControl
                htmlFor='phonePersonal'
                label="(-) מספר סלולרי ללא"
                register={register}
                registerName="businessDetails.phonePersonal"
                inputType='tel'
                placeholder="0502387677"
                errorMessage={errors.businessDetails?.phonePersonal?.message} />


              {/* FAX NUMBER */}
              <FormControl
                htmlFor='faxNumber'
                label="(-) מספר טלפון ללא"
                register={register}
                registerName="businessDetails.faxNumber"
                inputType='tel'
                placeholder='035740487'
                errorMessage={errors.businessDetails?.faxNumber?.message} />


              {/* EMAIL */}
              <FormControl
                htmlFor='email'
                label="כתובת אימייל"
                register={register}
                registerName="businessDetails.email"
                inputType='email'
                errorMessage={errors.businessDetails?.email?.message} />


              {/* COMPANY OCCUPATION */}
              <FormControl
                htmlFor='companyOccupation'
                label="עיסוק"
                register={register}
                registerName="businessDetails.companyOccupation"
                errorMessage={errors.businessDetails?.companyOccupation?.message} />
            </div>
          </div>


          {/* Owners details */}
          <h3>פרטי בעל\י החברה</h3>
          <div className="white-container">
            <table>
              <thead>
                <tr>
                  <th>שם משפחה</th>
                  <th>שם פרטי</th>
                </tr>
              </thead>
              <tbody>
                {ownersFields.map((field, index) => (
                  <tr className="owners-table" key={field.id}>
                    <td>
                      <label htmlFor={`owners.${index}.firstName`}></label>
                      <input
                        id={`owners.${index}.firstName`}
                        autoComplete="new-password"
                        {...register(`owners.${index}.firstName` as const)} />
                      <p className="error">{errors?.owners && errors?.owners[index]?.firstName?.message}</p>
                    </td>
                    <td>
                      <label htmlFor={`owners.${index}.lastName`}></label>
                      <input
                        id={`owners.${index}.lastName`}
                        autoComplete="new-password"
                        {...register(`owners.${index}.lastName` as const)} />
                      <p className="error">{errors?.owners && errors?.owners[index]?.lastName?.message}</p>
                    </td>
                    <td className="remove-trash-td"><AiOutlineUserDelete onClick={() => removeOwnerFromList(index)} className='remove-trash-icon' /></td>
                  </tr>
                ))}
              </tbody>

            </table>
            <button type="button" className="add-product" onClick={() => addOwnerToList()}>הוסף בעלים</button>
          </div>


          {/* DESCRIPTION OF THE REQUEST SECTION */}
          {screenWidth < 500 ? <>
            <h3>תיאור הבקשה</h3>
            <div className="product-container product-table white-container">

              {productFields.map((field, index) => (
                <div key={field.id}>
                  {/* SMALL SCREENS */}
                  <div className="products-list-for-small-screens">

                    {/* product.itemName */}
                    <FormControl
                      htmlFor={`product.${index}.itemName`}
                      label="מוצר"
                      register={register}
                      registerName={`product.${index}.itemName` as const}
                      errorMessage={errors?.product && errors?.product[index]?.itemName?.message} />


                    {/* product.itemName */}
                    <FormControl
                      htmlFor={`product.${index}.color`}
                      label="צבע"
                      register={register}
                      registerName={`product.${index}.color` as const}
                      errorMessage={errors?.product && errors?.product[index]?.color?.message} />

                    {/* product.size */}
                    <FormControl
                      htmlFor={`product.${index}.size`}
                      label="מידה"
                      register={register}
                      registerName={`product.${index}.size` as const}
                      errorMessage={errors?.product && errors?.product[index]?.size?.message} />


                    <div className="form-control">
                      <label htmlFor={`product.${index}.kind`}>סוג</label>
                      <select id={`product.${index}.kind`} {...register(`product.${index}.kind` as const)}>
                        <option value="קרטונים">קרטונים</option>
                        <option value="גלילים">גלילים</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label htmlFor={`product.${index}.amount`}>כמות</label>
                      <input type="number" min="0" max="100" id={`product.${index}.amount`} {...register(`product.${index}.amount` as const)} />
                    </div>

                    <td className="remove-trash-td"><RiDeleteBinLine onClick={() => removeProductFromList(index)} className='remove-trash-icon' /></td>
                  </div>
                </div>
              ))}
              <button type="button" className="add-product" onClick={() => addProductToList()}>הוסף מוצר</button>
            </div>

          </> : <>
            <h3>תיאור הבקשה</h3>
            <div className="white-container">
              <table>
                <thead>
                  <tr>
                    <th>כמות</th>
                    <th>סוג</th>
                    <th>מידה</th>
                    <th>צבע</th>
                    <th>מוצר</th>
                  </tr>
                </thead>
                <tbody>
                  {productFields.map((field, index) => (
                    <tr key={field.id}>
                      <td>
                        <label htmlFor={`product.${index}.amount`}></label>
                        <input id={`product.${index}.amount`} type="number" min="0" max="100" {...register(`product.${index}.amount` as const)} />
                        <p className="error">{errors?.product && errors?.product[index]?.amount?.message}</p>
                      </td>
                      <td>
                        <select id={`product.${index}.kind`} {...register(`product.${index}.kind` as const)}>
                          <option value="קרטונים">קרטונים</option>
                          <option value="גלילים">גלילים</option>
                        </select>
                      </td>
                      <td>
                        <label htmlFor={`product.${index}.size`}></label>
                        <textarea id={`product.${index}.size`} {...register(`product.${index}.size` as const)} />
                      </td>
                      <td>
                        <label htmlFor={`product.${index}.color`}></label>
                        <textarea id={`product.${index}.color`} {...register(`product.${index}.color` as const)} />
                      </td>

                      <td>
                        <label htmlFor={`product.${index}.itemName`}></label>
                        <textarea id={`product.${index}.itemName`} {...register(`product.${index}.itemName` as const)} />
                      </td>

                      <td className="remove-trash-td"><RiDeleteBinLine onClick={() => removeProductFromList(index)} className='remove-trash-icon' /></td>
                    </tr>
                  ))}
                </tbody>

              </table>
              <button type="button" className="add-product" onClick={() => addProductToList()}>הוסף מוצר</button>
            </div>
          </>}

          <h3>שם ממלא הטופס</h3>
          <footer className="white-container">
            {/* Signer's name */}
            <FormControl
              htmlFor='signerName'
              label="שם מלא"
              register={register}
              registerName="signerName"
              errorMessage={errors.signerName?.message} />


            {/* Message */}
            <FormControl
              htmlFor='message'
              label="הערות"
              register={register}
              registerName="message"
              errorMessage={errors.message?.message} />

          </footer>

          {/* SUBMIT BUTTON */}
          <button type="submit" disabled={isSending} className="submit">{isSending ? "...שולח" : "שלח"}</button>
        </form>
      </div>
    </LocalizationProvider>
  )
}

export default HomePage