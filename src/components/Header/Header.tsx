import logo from 'assets/logo.svg'
import './header.scss'

const Header = () => {
  return (
    <header className="golden-tape-form-header">
      <img src={logo} alt="" />
      <h2>טופס בקשה להצעת מחיר</h2>
    </header>
  )
}

export default Header