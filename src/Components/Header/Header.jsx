"use client"
import style from './Header.module.css'
import Link from "next/link"
import Links from "./Links/Links"
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useState } from 'react';

const Header = () => {

  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className={style.header}>

      {/* Header Wrapper  */}
      <div className={`${style.wrapper} wrapper-width`}>

        {/* Logo Part  */}
        <div className={style.logoPart} >
            <Link href={'/'}>
                <img className={style.logo} src="/logo.png" alt="" />
            </Link>
        </div>

        {/* NavLinks part */}
        <Links mobileMenu={mobileMenu} />

        {/* Buttons part */}
        <div className={style.buttonPart} >
            <Link href={'/register'} className={style.btn}>Join</Link>
        </div>

        {/* Mobile Menu Icon  */}
        { !mobileMenu ? <RxHamburgerMenu className={style.menuIcon} onClick={()=>setMobileMenu(!mobileMenu)} />
          : <RxCross1 className={style.menuIcon} onClick={()=>setMobileMenu(!mobileMenu)} />}
      </div>
    </header>
  )
}

export default Header