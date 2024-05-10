import Link from 'next/link';
import style from './GroupCardSM.module.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const GroupCardSM_Skeleton = () => {
  return (
    <SkeletonTheme baseColor="#e9e7e8" highlightColor="#dedede" >

      <div className={style.GroupCardSM}>
        <div className={style.leftPart}>
          {/* Profile Photo  */}
          <div className={style.profileImgWrapper}>
            <Skeleton height={50} width={50} circle />
          </div>
          <div className={style.metaData}>
            <Skeleton height={13} width={100} />
            <Skeleton height={13} width={60} />
          </div>
        </div>
        <Skeleton height={6} width={0} />
        <Skeleton height={30} width={70} />
      </div>
    </SkeletonTheme>
  )
}

export default GroupCardSM_Skeleton