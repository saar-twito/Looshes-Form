import { IFormUtils } from 'common/interface'
import './SignerName.scss'


const SignerName = ({ register, errors }: IFormUtils) => {
  return (
    <div>
      <h3>Signer's name</h3>
      <footer className="white-container">
        {/* Signer's name */}
        <div className="form-control">
          <label htmlFor="signerName">Full name</label>
          <input id="signerName" {...register('signerName')} />
          <p className="error">{errors.signerName?.message}</p>
        </div>

        {/* Message */}
        <div className="form-control">
          <label htmlFor="message">Notes</label>
          <textarea className="message" id="message" {...register('message')} />
        </div>
      </footer>
    </div>
  )
}

export default SignerName