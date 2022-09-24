
import logo from 'assets/logo.svg';
import './SubmitSuccessful.scss'


const SubmitSuccessful = () => {
  return (
    <div className="submit-successful">
      <img src={logo} alt="Looshes logo" />
      <h1>You have successfully submitted the form</h1>
    </div>
  )
}

export default SubmitSuccessful