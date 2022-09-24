import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import FormControl from 'common/components/FormControl/FormControl';
import UseWindowSize from 'common/hooks/UseWindowsSize';
import { IFormUtils } from 'common/interface';
import { Dayjs } from 'dayjs';
import './BusinessDetails.scss'

interface IBusinessDetails extends IFormUtils {
  date: Dayjs | null;
  handleChange: (newValue: Dayjs | null) => void
}

const BusinessDetails = ({ register, errors, date, handleChange }: IBusinessDetails) => {
  const [, screenWidth] = UseWindowSize();

  return (
    <div className="business-details-container">

      <header className='business-details-header'>
        <h2>business details</h2>
        <div className="form-control">
          <label htmlFor="date">Date</label>
          {screenWidth < 500 ? <>
            <MobileDatePicker
              {...register("date")}
              inputFormat="DD/MM/YYYY"
              value={date}
              closeOnSelect={true}
              onChange={handleChange}
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
          label='company name'
          register={register}
          registerName="businessDetails.companyName"
          errorMessage={errors.businessDetails?.companyName?.message} />

        {/* COMPANY ADDRESS */}
        <FormControl
          htmlFor='companyAddress'
          label='company Address'
          register={register}
          registerName="businessDetails.companyAddress"
          errorMessage={errors.businessDetails?.companyAddress?.message} />

        {/* VAT NUMBER */}
        <FormControl
          htmlFor='vatNumber'
          label='vat Number'
          register={register}
          registerName="businessDetails.vatNumber"
          errorMessage={errors.businessDetails?.vatNumber?.message} />

        {/* COMPANY PHONE */}
        <FormControl
          htmlFor='companyPhone'
          label='company Phone'
          register={register}
          registerName="businessDetails.companyPhone"
          errorMessage={errors.businessDetails?.companyPhone?.message} />

        {/* PHONE PERSONAL */}
        <FormControl
          htmlFor='phonePersonal'
          label='phone Personal'
          register={register}
          registerName="businessDetails.phonePersonal"
          errorMessage={errors.businessDetails?.phonePersonal?.message} />

        {/* FAX NUMBER */}
        <FormControl
          htmlFor='faxNumber'
          label='fax Number'
          register={register}
          registerName="businessDetails.faxNumber"
          errorMessage={errors.businessDetails?.faxNumber?.message} />

        {/* EMAIL */}
        <FormControl
          htmlFor='email'
          label='email'
          register={register}
          registerName="businessDetails.email"
          errorMessage={errors.businessDetails?.email?.message} />

        {/* COMPANY OCCUPATION */}
        <FormControl
          htmlFor='companyOccupation'
          label='company Occupation'
          register={register}
          registerName="businessDetails.companyOccupation"
          errorMessage={errors.businessDetails?.companyOccupation?.message} />
      </div>
    </div>
  )
}

export default BusinessDetails