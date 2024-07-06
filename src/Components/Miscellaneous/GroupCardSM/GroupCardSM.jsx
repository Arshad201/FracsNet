import Link from 'next/link';
import style from './GroupCardSM.module.css';
import Settings from '../Settings/Settings';


const GroupCardSM = ({ data, groupCardType }) => {

  return (
    <div className={style.GroupCardSM}>
      <div className={style.leftPart}>
        {/* Profile Photo  */}
        <Link href={`/group/${data._id}`} className={style.profileImgWrapper}>
          <img src={data.groupImage.url} alt="" />
        </Link>
        <div className={style.metaData}>
          <Link href={`/group/${data._id}`} className={style.groupName}>{data.groupTitle}</Link>
        </div>
        <Settings settingOptions={[]}/>
      </div>
      {groupCardType == "not-joined" && <button className={style.btn}>Join</button>}
    </div>
  )
}

export default GroupCardSM