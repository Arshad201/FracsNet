import Link from 'next/link';
import style from './ProfileCardSM.module.css';
import { formattingName } from '@/lib/utils/valueFormatting';

const ProfileCardSM = ({ data }) => {

  return (
    <div className={style.ProfileCardSM}>
      <div className={style.leftPart}>
        {/* Profile Photo  */}
        <Link href={`/profile/${data?.userName}`} className={style.profileImgWrapper}>
          <img src={data?.profilePic?.url} alt="" />
        </Link>
        <div className={style.metaData}>
          <Link href={`/profile/${data?.userName}`} className={style.userName}>{formattingName(data)}</Link>
          <span className={style.postedOn}>{data?.designation ? data.designation : ""}</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileCardSM