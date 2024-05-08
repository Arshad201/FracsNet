import Link from 'next/link'
import style from './ProfileCard.module.css'
import { GoGlobe } from "react-icons/go";
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";
import { MotionDiv } from '../MotionDiv';

const ProfileCard = ({index, data}) => {

    const variants = {
      hidden: { opacity: 0 },
      visible: {opacity: 1}
  }

  return (
    <MotionDiv
    variants={variants}
    initial = "hidden"
    animate = "visible"
    transition={{
        delay: index*0.25,
        ease: "easeInOut",
        duration: 0.5
    }}
    className={style.ProfileCard}>
        <div className={style.imgBox}>
          <img src="/profile.jpg" alt="" />
        </div>
        <span className={style.level}>Pro</span>
        <span className={style.userName}>{data.firstName} {data.lastName}</span>
        <span className={style.role}>{data.role}</span>
        <p className={style.bio}>{data.bio}.</p>
        <div className={style.socialMediaLinks}>
          <Link href={"/"}><GoGlobe className={style.socialIcon} /></Link>
          <Link href={"/"}><FaFacebookF className={style.socialIcon} /></Link>
          <Link href={"/"}><BsInstagram className={style.socialIcon} /></Link>
          <Link href={"/"}><RiTwitterXLine className={style.socialIcon} /></Link>
          <Link href={"/"}><FaLinkedinIn className={style.socialIcon} /></Link>
        </div>
        <div className={style.btns}>
          <Link className={style.btn} href={"/"}>View Profile</Link>
          <Link className={style.btn} href={"/"}>Connect</Link>
        </div>
        
    </MotionDiv>
  )
}

export default ProfileCard