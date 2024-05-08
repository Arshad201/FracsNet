import style from './ProfileCardSM.module.css';


const ProfileCardSM = () => {
  return (
    <div className={style.ProfileCardSM}>
        <div className={style.leftPart}>
                {/* Profile Photo  */}
                <div className={style.profileImgWrapper}>
                    <img src="/profile.jpg" alt="" /> 
                </div>
                <div className={style.metaData}>
                    <span className={style.userName}>John Doe</span>
                    <span className={style.postedOn}>Web Developer</span>
                </div>
        </div>
    </div>
  )
}

export default ProfileCardSM