import React from 'react'
import logo from 'assets/logo.svg';
import './Header.scss'

const Header = () => {
  return (
    <header className="golden-tape-form-header">
      <img src={logo} alt="" />
      <h2>טופס בקשה להצעת מחיר</h2>
    </header>
  )
}

export default Header