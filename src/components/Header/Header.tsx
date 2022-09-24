import React from 'react'
import logo from 'assets/logo.webp';
import './Header.scss'

const Header = () => {
  return (
    <header className="golden-tape-form-header">
      <img src={logo} alt="" />
      <h1>form for a new client</h1>
    </header>
  )
}

export default Header