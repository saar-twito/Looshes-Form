import './homePage.scss'

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormValues } from 'common/interface';
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import BusinessDetails from 'components/Form/BusinessDetails/BusinessDetails';
import Header from 'components/Header/Header';
import CompanyOwnerDetails from 'components/Form/CompanyOwnerDetails/CompanyOwnerDetails';
import ListOfProducts from 'components/Form/ListOfProducts/ListOfProducts';
import SignerName from 'components/Form/SignerName/SignerName';
import { formSchema } from 'components/Form/formSchema';
import { toast } from 'react-toastify';


const HomePage = () => {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs(new Date()));
  const [isSending, setIsSending] = React.useState<boolean>(false)
  const form = useRef<any>()


  // useForm Will help us managing the form properties
  const { control, register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      date: date,
    },
    resolver: yupResolver(formSchema) // resolver for yup to work with react-hook-form
  });


  const onSubmit = handleSubmit(async (data: FormValues) => {
    // @ts-ignore //! => Don't Remove The @Ts-Ignore
    form.current[0].value = date?.$d;
    form.current[0].name = "Date of submit";



    form.current[3].name = "Company name";
    form.current[4].name = "Company address";
    form.current[5].name = "Company Vat number";
    form.current[6].name = "Company phone";
    form.current[7].name = "Personal phone";
    form.current[8].name = "Fax number";
    form.current[9].name = "Email";
    form.current[10].name = "Company Occupation";


    setIsSending(true)

    const handelFormSubmissionError = () => {
      toast.error("An error occurred please contact me via Whatsapp", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
        hideProgressBar: true
      });
      setIsSending(false)
    }

    console.log(form);
    console.log(data);


    // fetch('https://formspree.io/f/maykydyq', {
    //   method: 'POST',
    //   // @ts-ignore
    //   body: new FormData(form.current),
    //   headers: { 'Accept': 'application/json' }
    // }).then(response => {
    //   if (response.ok) {
    //     // helpers.resetForm();
    //     // navigate(`/${routers.formSubmission}`)
    //     // navigate("landing-page") without the "/" it will be relative "home-page/landing-page"
    //   } else handelFormSubmissionError()

    // }).catch(err => { handelFormSubmissionError() })

  })


  const handleChange = (newValue: Dayjs | null) => {
    setDate(newValue);
  };



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

          {/* Signer's name */}
          <SignerName register={register} errors={errors} />

          {/* SUBMIT BUTTON */}
          <button type="submit" className="submit">Send</button>
        </form>

      </div>
    </LocalizationProvider>


  )
}

export default HomePage