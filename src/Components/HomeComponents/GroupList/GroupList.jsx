import ProfileCardSM from '@/Components/Miscellaneous/ProfileCardSM/ProfileCardSM';
import style from './GroupList.module.css';
import GroupCardSM from '@/Components/Miscellaneous/GroupCardSM/GroupCardSM';
import GroupCardSM_Skeleton from '@/Components/Miscellaneous/GroupCardSM/GroupCardSM_Skeleton';

const GroupList = () => {
  return (
    <div className={style.GroupList}>
      <h2 className={style.heading}>Joined Groups</h2>
      <div className={style.networks}>
        <GroupCardSM_Skeleton />
        <GroupCardSM />
        <GroupCardSM />
        <GroupCardSM />
        <GroupCardSM />
      </div>
      <button className={style.btn}>Load More</button>
    </div>
  )
}

export default GroupList