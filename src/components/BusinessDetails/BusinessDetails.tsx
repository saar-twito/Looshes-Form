import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import UseWindowSize from 'common/hooks/UseWindowsSize';
import dayjs, { Dayjs } from 'dayjs';

interface IBusinessDetails {
  register: any;
  errors: any;
  date: Dayjs | null;
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
}

const BusinessDetails = ({ register, errors, date, setDate }: IBusinessDetails) => {
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
              onChange={setDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </> :
            <>
              <DesktopDatePicker
                {...register("dateOfSubmit")}
                inputFormat="DD/MM/YYYY"
                value={date}
                onChange={setDate}
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
  )
}

export default BusinessDetails