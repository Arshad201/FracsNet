import style from './GroupCardSM.module.css';

const GroupCardSM = () => {
  return (
    <div className={style.GroupCardSM}>
        <div className={style.leftPart}>
                {/* Profile Photo  */}
                <div className={style.profileImgWrapper}>
                    <img src="/profile.jpg" alt="" /> 
                </div>
                <div className={style.metaData}>
                    <span className={style.postedOn}>Indian MERN Stack Developers</span>
                </div>
        </div>
                <button className={style.btn}>Join</button>
    </div>
  )
}

export default GroupCardSM