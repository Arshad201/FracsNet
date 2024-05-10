import Link from 'next/link';
import style from './GroupCardSM.module.css';

const GroupCardSM = () => {
  return (
    <div className={style.GroupCardSM}>
      <div className={style.leftPart}>
        {/* Profile Photo  */}
        <Link href={"/"} className={style.profileImgWrapper}>
          <img src="/profile.jpg" alt="" />
        </Link>
        <div className={style.metaData}>
          <Link href={"/"} className={style.groupName}>Indian MERN Stack Developers</Link>
        </div>
      </div>
      <button className={style.btn}>Join</button>
    </div>
  )
}

export default GroupCardSM