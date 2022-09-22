import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import FormControl from 'common/components/FormControl/FormControl';
import UseWindowSize from 'common/hooks/UseWindowsSize';
import { Dayjs } from 'dayjs';
import './BusinessDetails.scss'

interface IBusinessDetails {
  register: any;
  errors: any;
  date: Dayjs | null;
  handleChange: (newValue: Dayjs | null) => void
}

const BusinessDetails = ({ register, errors, date, handleChange }: IBusinessDetails) => {
  const [, screenWidth] = UseWindowSize();

  return (
    <div className="business-details-container">

      <header className='business-details-header'>
        <h3>פרטי העסק</h3>
        <div className="form-control">
          <label htmlFor="date">תאריך</label>
          {screenWidth < 500 ? <>
            <MobileDatePicker
              {...register("dateOfSubmit")}
              inputFormat="DD/NN/YYYY"
              value={date}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </> :
            <>
              <DesktopDatePicker
                {...register("dateOfSubmit")}
                inputFormat="DD/MM/YYYY"
                value={date}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </>}
          <p className="error">{errors.dateOfSubmit?.message}</p>
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
          label='ח.פ / עוסק מורשה'
          register={register}
          registerName="businessDetails.vatNumber"
          errorMessage={errors.businessDetails?.vatNumber?.message} />

        {/* COMPANY PHONE */}
        <FormControl
          htmlFor='companyPhone'
          label='מספר טלפון'
          register={register}
          registerName="businessDetails.companyPhone"
          errorMessage={errors.businessDetails?.companyPhone?.message} />

        {/* PHONE PERSONAL */}
        <FormControl
          htmlFor='phonePersonal'
          label='מספר סלולרי'
          register={register}
          registerName="businessDetails.phonePersonal"
          errorMessage={errors.businessDetails?.phonePersonal?.message} />

        {/* FAX NUMBER */}
        <FormControl
          htmlFor='faxNumber'
          label='מספר פקס'
          register={register}
          registerName="businessDetails.faxNumber"
          errorMessage={errors.businessDetails?.faxNumber?.message} />

        {/* EMAIL */}
        <FormControl
          htmlFor='email'
          label='כתובת אימייל'
          register={register}
          registerName="businessDetails.email"
          errorMessage={errors.businessDetails?.email?.message} />

        {/* COMPANY OCCUPATION */}
        <FormControl
          htmlFor='companyOccupation'
          label='עיסוק'
          register={register}
          registerName="businessDetails.companyOccupation"
          errorMessage={errors.businessDetails?.companyOccupation?.message} />
      </div>
    </div>
  )
}

export default BusinessDetails