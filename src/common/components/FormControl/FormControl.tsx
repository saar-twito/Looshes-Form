import { FormValues } from 'common/interface';
import { UseFormRegister } from 'react-hook-form';
import './formControl.scss'

interface IFormControl {
  htmlFor: string;
  label: string;
  register: UseFormRegister<FormValues>;
  registerName: any;
  errorMessage: string | undefined;
  inputType?: string;
  placeholder?: string

}

const FormControl = ({ htmlFor, label, registerName, errorMessage, register, inputType = "text", placeholder }: IFormControl) => {
  return (
    <div className="form-control">
      <label htmlFor={htmlFor}>{label}</label>
      <input placeholder={placeholder} type={inputType} id={htmlFor} {...register(registerName)} />
      <p className="error">{errorMessage}</p>
    </div>
  )
}

export default FormControl