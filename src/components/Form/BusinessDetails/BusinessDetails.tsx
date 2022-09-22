
import FormControl from 'common/components/FormControl/FormControl';
import DatePicker from 'components/DatePicker/DatePicker';
import dayjs from 'dayjs';
import './businessDetails.scss'

interface IBusinessDetails {
  register: any;
  errors: any
  date: dayjs.Dayjs | null
  setOfDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>
}

const BusinessDetails = ({ register, errors, date, setOfDate }: IBusinessDetails) => {

  return (
    <div className="business-details-container">

      <header className='business-details-header'>
        <h3>פרטי העסק</h3>
        <div className="form-control">
          <DatePicker register={register} errors={errors} date={date} setOfDate={setOfDate} />
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
  )
}

export default BusinessDetails