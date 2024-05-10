import ProfileCardSM from '@/Components/Miscellaneous/ProfileCardSM/ProfileCardSM';
import style from './NetworkList.module.css';
import ProfileCardSM_Skeleton from '@/Components/Miscellaneous/ProfileCardSM/ProfileCardSM_Skeleton';

const NetworkList = () => {
  return (
    <div className={style.NetworkList}>
        <h2 className={style.heading}>My Network</h2>
        <div className={style.networks}>
            <ProfileCardSM_Skeleton/>
            <ProfileCardSM/>
            <ProfileCardSM/>
            <ProfileCardSM/>
            <ProfileCardSM/>
        </div>
        <button className={style.btn}>Load More</button>
    </div>
  )
}

export default NetworkList