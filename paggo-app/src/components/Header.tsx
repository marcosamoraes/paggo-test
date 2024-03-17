import React from 'react'
import Logo from './Logo'

const Header: React.FC<any> = () => {
  return (
    <header className="flex flex-col items-center gap-6">
      <Logo />
      <h2 className="text-2xl">Upload your invoice and we&apos;ll do the rest.</h2> 
    </header>
  )
}

export default Header
