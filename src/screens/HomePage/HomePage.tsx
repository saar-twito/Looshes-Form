import './homePage.scss';
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
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs(new Date()));
  const [isSending, setIsSending] = React.useState<boolean>(false);
  const form = useRef<any>();
  const navigate = useNavigate();

  // useForm Will help us managing the form properties
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: yupResolver(formSchema), // resolver for yup to work with react-hook-form
  });

  const onSubmit = handleSubmit(async (data: FormValues) => {
    console.log('onSubmit ~ data', data);
    navigate('/form-submitted');
  });

  const handleChange = (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='golden-tape-form-container'>
        <Header />

        {/* Form */}
        <form ref={form} onSubmit={onSubmit} autoComplete='off'>
          {/* Business Details Section */}
          <BusinessDetails
            register={register}
            errors={errors}
            date={date}
            handleChange={handleChange}
          />

          {/* Owners details */}
          <CompanyOwnerDetails
            control={control}
            register={register}
            errors={errors}
          />

          {/* DESCRIPTION OF THE REQUEST SECTION
          <ListOfProducts
            control={control}
            register={register}
            errors={errors}
          /> */}

          {/* Signer's name */}
          <SignerName register={register} errors={errors} />

          {/* SUBMIT BUTTON */}
          <button type='submit' disabled={isSending} className='submit'>
            {isSending ? 'sending' : 'send'}
          </button>
        </form>
      </div>
    </LocalizationProvider>
  );
};

export default HomePage;
