import { IFormUtils } from 'common/interface'



const SignerName = ({ register, errors }: IFormUtils) => {
  return (
    <div>
      <h3>שם ממלא הטופס</h3>
      <footer className="white-container">
        {/* Signer's name */}
        <div className="form-control">
          <label htmlFor="signerName">שם מלא</label>
          <input id="signerName" {...register('signerName')} />
          <p className="error">{errors.signerName?.message}</p>
        </div>

        {/* Message */}
        <div className="form-control">
          <label htmlFor="message">הערות</label>
          <textarea className="message" id="message" {...register('message')} />
        </div>
      </footer>
    </div>
  )
}

export default SignerName