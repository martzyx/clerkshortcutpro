import React from 'react'
import ClerkSniffer from './ClerkSniffer'
import ClerkIcon from '../assets/icons/color/@2x/16@2x.png';

const Header = () => {
  return (
    <header className='flex justify-between mx-4 my-2 items-center'>
        <img src={ClerkIcon} />
        <ClerkSniffer />
    </header>
  )
}

export default Header