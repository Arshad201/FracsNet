import Link from 'next/link'
import style from './ProfileCard.module.css'
import { GoGlobe } from "react-icons/go";
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";
import { MotionDiv } from '../MotionDiv';
import { formattingName } from '@/lib/utils/valueFormatting';
import Settings from '../Settings/Settings';
import { settingOptions_profileCard } from '@/lib/settings/profileCard';

const ProfileCard = ({ data }) => {

  // const settingOptions = settingOptions_profileCard(data);

  return (
    <div className={style.ProfileCard}>
      <div className={style.settings}>
        <Settings settingOptions={[]} dataFromDB={data} />
      </div>
      <Link href={`/profile/${data.userName}`} className={style.imgBox}>
        <img src={data.profilePic.url} alt="" />
      </Link>
      <span className={style.level}>{data.accountType}</span>
      <span className={style.userName}>{formattingName(data)}</span>
      {data.designation && <span className={style.role}>{data.designation}</span>}
      {data.bio && <p className={style.bio}>{data.bio}</p>}
      {/* <div className={style.socialMediaLinks}>
          <Link href={"/"}><GoGlobe className={style.socialIcon} /></Link>
          <Link href={"/"}><FaFacebookF className={style.socialIcon} /></Link>
          <Link href={"/"}><BsInstagram className={style.socialIcon} /></Link>
          <Link href={"/"}><RiTwitterXLine className={style.socialIcon} /></Link>
          <Link href={"/"}><FaLinkedinIn className={style.socialIcon} /></Link>
        </div> */}
      <div className={style.btns}>
        {/* <Link className={style.btn} href={"/"}>View Profile</Link> */}
        {/* <Link className={style.btn} href={"/"}>Connect</Link> */}
      </div>

    </div>
  )
}

export default ProfileCard