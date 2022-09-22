
import logo from 'assets/logo.svg';
import './submitSuccessful.scss'


const SubmitSuccessful = () => {
  return (
    <div className="submit-successful">
      <img src={logo} alt="Looshes logo" />
      <h1>!הטופס נשלח בהצלחה</h1>
    </div>
  )
}

export default SubmitSuccessful