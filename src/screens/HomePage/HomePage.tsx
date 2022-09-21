import './homePage.scss'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { formSchema } from './formSchema';
import { FormValues } from './interfaces';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { toast } from 'react-toastify';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs, { Dayjs } from 'dayjs';
import Header from 'components/Header/Header';
import BusinessDetails from 'components/Form/BusinessDetails/BusinessDetails';
import ProductDetails from 'components/Form/ProductDetails/ProductDetails';
import SigneeName from 'components/Form/SigneeName/SigneeName';
import CompanyOwnerDetails from 'components/Form/CompanyOwnerDetails/CompanyOwnerDetails';

const HomePage = () => {
  const [isSending, setIsSending] = useState<boolean>(false)
  const [date, setOfDate] = useState<Dayjs | null>(() => dayjs(new Date()));
  const form = useRef<any>();
  const navigate = useNavigate()


  // useForm Will help us managing the form properties
  const { control, register, handleSubmit, formState: { errors, }, reset } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      date: date
    },
    resolver: yupResolver(formSchema) // resolver for yup to work with react-hook-form
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


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="golden-tape-form-container">

        {/* Page Header */}
        <Header />

        {/* Form */}
        <form ref={form} onSubmit={handleSubmit(onSubmit)} autoComplete="off">

          {/* Business Details Section */}
          <BusinessDetails register={register} errors={errors} date={date} setOfDate={setOfDate} />


          {/* Owners details */}
          <CompanyOwnerDetails register={register} errors={errors} control={control} />


          {/* DESCRIPTION OF THE REQUEST SECTION */}
          <ProductDetails register={register} errors={errors} control={control} />


          {/* Signee's name */}
          <SigneeName register={register} errors={errors} />


          {/* SUBMIT BUTTON */}
          <button type="submit" disabled={isSending} className="submit">{isSending ? "...שולח" : "שלח"}</button>
        </form>
      </div>
    </LocalizationProvider>
  )
}

export default HomePage