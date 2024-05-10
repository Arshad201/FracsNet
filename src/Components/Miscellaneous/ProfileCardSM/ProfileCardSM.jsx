import Link from 'next/link';
import style from './ProfileCardSM.module.css';

const ProfileCardSM = () => {
  return (
    <div className={style.ProfileCardSM}>
        <div className={style.leftPart}>
                {/* Profile Photo  */}
                <Link href={"/"} className={style.profileImgWrapper}>
                    <img src="/profile.jpg" alt="" /> 
                </Link>
                <div className={style.metaData}>
                    <Link href={"/"} className={style.userName}>John Doe</Link>
                    <span className={style.postedOn}>Web Developer</span>
                </div>
        </div>
    </div>
  )
}

export default ProfileCardSM