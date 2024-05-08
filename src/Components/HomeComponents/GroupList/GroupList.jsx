import ProfileCardSM from '@/Components/Miscellaneous/ProfileCardSM/ProfileCardSM';
import style from './GroupList.module.css';
import GroupCardSM from '@/Components/Miscellaneous/GroupCardSM/GroupCardSM';

const GroupList = () => {
  return (
    <div className={style.GroupList}>
        <h2 className={style.heading}>Joined Groups</h2>
        <div className={style.networks}>
            <GroupCardSM/>
            <GroupCardSM/>
            <GroupCardSM/>
            <GroupCardSM/>
            <GroupCardSM/>
        </div>
        <button className={style.btn}>Load More</button>
    </div>
  )
}

export default GroupList