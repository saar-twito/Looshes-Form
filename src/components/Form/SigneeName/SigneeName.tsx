import FormControl from 'common/components/FormControl/FormControl'
import React from 'react'

interface ISigneeName {
  register: any;
  errors: any
}


const SigneeName = ({ register, errors }: ISigneeName) => {
  return (
    <div>
      <h3>שם ממלא הטופס</h3>
      <footer className="white-container">
        {/* Signer's name */}
        <FormControl
          htmlFor='signerName'
          label="שם מלא"
          register={register}
          registerName="signerName"
          errorMessage={errors.signerName?.message} />


        {/* Message */}
        <FormControl
          htmlFor='message'
          label="הערות"
          register={register}
          registerName="message"
          errorMessage={errors.message?.message} />

      </footer>
    </div>
  )
}

export default SigneeName