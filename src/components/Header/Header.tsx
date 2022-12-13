import logo from 'assets/logo.webp';
import './Header.scss';

const Header = () => {
  return (
    <header className='golden-tape-form-header'>
      <img src={logo} alt='' />
      <h1>form for a new client</h1>
      <small>
        <strong>
          THE FORM IS INTENDED FOR PRESENTING A PORTFOLIO AND NOT FOR REAL
          PUBLIC SERVICE.
        </strong>
      </small>
    </header>
  );
};

export default Header;
