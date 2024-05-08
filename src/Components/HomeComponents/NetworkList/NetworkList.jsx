import ProfileCardSM from '@/Components/Miscellaneous/ProfileCardSM/ProfileCardSM';
import style from './NetworkList.module.css';

const NetworkList = () => {
  return (
    <div className={style.NetworkList}>
        <h2 className={style.heading}>My Network</h2>
        <div className={style.networks}>
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