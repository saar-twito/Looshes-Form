
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import UseWindowSize from 'common/hooks/UseWindowsSize';
import dayjs, { Dayjs } from 'dayjs';
import './datePicker.scss'

interface IDatePicker {
  register: any;
  errors: any;
  date: dayjs.Dayjs | null
  setOfDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>
}

const DatePicker = ({ register, errors, date, setOfDate }: IDatePicker) => {
  const [, screenWidth] = UseWindowSize();


  const handleChange = (newValue: Dayjs | null) => {
    setOfDate(newValue);
  };

  return (
    <>
      <label htmlFor="date">תאריך</label>
      {
        screenWidth < 500 ? <>
          <MobileDatePicker
            {...register("date")}
            inputFormat="DD/MM/YYYY"
            value={date}
            closeOnSelect={true}
            onChange={handleChange}
            className="form-control-date"
            renderInput={(params) => <TextField {...params} />}
          />
        </>
          :
          <DesktopDatePicker
            {...register("date")}
            inputFormat="DD/MM/YYYY"
            value={date}
            closeOnSelect={true}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
      }
      <p className="error">{errors.date?.message}</p>
    </>

  )
}

export default DatePicker