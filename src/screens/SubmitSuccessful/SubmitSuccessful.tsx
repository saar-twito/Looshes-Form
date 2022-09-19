
import logo from '../../assets/logo.webp';
import './submitSuccessful.scss'



const SubmitSuccessful = () => {
  return (
    <div className="submit-successful">
      <img src={logo} alt="Golden tape logo" />
      <h1>!הטופס נשלח בהצלחה</h1>
    </div>
  )
}

export default SubmitSuccessful