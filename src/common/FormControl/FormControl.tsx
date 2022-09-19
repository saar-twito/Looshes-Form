import React from 'react'
import { UseFormRegister } from 'react-hook-form';
import { FormValues } from 'screens/HomePage/interfaces';

interface IFormControl {
  htmlFor: string;
  label: string;
  register: UseFormRegister<FormValues>
  registerName: any;
  errorMessage: string | undefined;
  inputType?: string;
  placeholder?: string

}

const FormControl = ({ htmlFor, label, registerName, errorMessage, register,inputType="text", placeholder}: IFormControl) => {
  return (
    <div className="form-control">
      <label htmlFor={htmlFor}>{label}</label>
      <input placeholder={placeholder} type={inputType} id={htmlFor} {...register(registerName)} />
      <p className="error">{errorMessage}</p>
    </div>
  )
}

export default FormControl