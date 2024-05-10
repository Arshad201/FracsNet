import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import style from './ShortInfo.module.css';


const ShortInfo_Skeleton = () => {
  return (
    <SkeletonTheme baseColor="#e9e7e8" highlightColor="#dedede" >
      <div className={style.ProfileCardSM}>
        <div className={style.leftPart}>
          <div className={style.profileImgWrapper}>
            <Skeleton height={95} width={95} circle />
          </div>
          <div className={style.metaData}>
          <Skeleton height={19} width={75} style={{marginBottom: '0.5rem'}}/>
          <Skeleton height={15} width={95}/>
          </div>
          <div className={style.followers}>
          <Skeleton height={15} width={75}/>
          <Skeleton height={15} width={75}/>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default ShortInfo_Skeleton