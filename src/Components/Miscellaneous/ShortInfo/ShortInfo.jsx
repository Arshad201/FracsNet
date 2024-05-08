import style from './ShortInfo.module.css';


const ShortInfo = ({btn}) => {
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
                <div className={style.followers}>
                  <span>10 Followers</span>
                  <span>15 Following</span>
                </div>
                {/* {btn !== "View profile" && <p className={style.bio}>"Crafting digital experiences one line of code at a time. Web developer with a passion for innovation and pixel-perfect design."</p>} */}

                {
                  btn === "request" && 
                  <>
                     <button className={`${style.btn} ${style.greenBtn}`}>Accept request</button>
                     <button className={`${style.btn} ${style.redBtn}`}>Reject request</button>
                  </>
                }


{
                  btn === "send" && 
                  <>
                     <button className={style.btn}>Send request</button>
                  </>
                }
        </div>
    </div>
  )
}

export default ShortInfo