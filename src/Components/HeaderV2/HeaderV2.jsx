"use client"
import style from './HeaderV2.module.css'
import Link from "next/link"
import Links from "./Links/Links"
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useState } from 'react';

const HeaderV2 = () => {

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

        {/* My Profile part */}
        <div className={style.mePart} >
             <div className={style.profileImgWrapper}>
                    <img src="/profile.jpg" alt="" /> 
              </div>
            <span className={style.heading}>
              Me
            </span>
        </div>

        {/* Mobile Menu Icon  */}
        {/* { !mobileMenu ? <RxHamburgerMenu className={style.menuIcon} onClick={()=>setMobileMenu(!mobileMenu)} />
          : <RxCross1 className={style.menuIcon} onClick={()=>setMobileMenu(!mobileMenu)} />} */}
      </div>
    </header>
  )
}

export default HeaderV2