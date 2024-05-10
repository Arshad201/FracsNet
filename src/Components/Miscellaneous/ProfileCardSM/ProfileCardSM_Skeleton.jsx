import Link from 'next/link';
import style from './ProfileCardSM.module.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const ProfileCardSM_Skeleton = () => {
  return (
    <SkeletonTheme baseColor="#e9e7e8" highlightColor="#dedede" >
      <div className={style.ProfileCardSM}>
        <div className={style.leftPart}>
          {/* Profile Photo  */}
          <div className={style.profileImgWrapper}>
            <Skeleton height={60} width={60} circle />
          </div>
          <div className={style.metaData}>
          <Skeleton height={13} width={50} />
          <Skeleton height={10} width={90} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default ProfileCardSM_Skeleton