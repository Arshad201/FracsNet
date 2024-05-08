import style from './ProfileCard.module.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const ProfileCardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#e9e7e8" highlightColor="#dedede" >
      <div className={`${style.ProfileCard} ${style.ProfileCardSkeleton}`}>
          <Skeleton height={90} width={90} circle/>
          <Skeleton height={30} width={50} />
          <Skeleton height={20} width={150} />
          <Skeleton height={16} width={100} />
          <Skeleton height={12} count={3}/>
          <div className={style.socialMediaLinks}>
            <Skeleton height={23} width={23} circle/>
            <Skeleton height={23} width={23} circle/>
            <Skeleton height={23} width={23} circle/>
            <Skeleton height={23} width={23} circle/>
            <Skeleton height={23} width={23} circle/>
            <Skeleton height={23} width={23} circle/>
          </div>
          <div className={style.btns}>
            <Skeleton height={30}/>
            <Skeleton height={30}/>
          </div>
          
      </div>
    </SkeletonTheme>
  )
}

export default ProfileCardSkeleton