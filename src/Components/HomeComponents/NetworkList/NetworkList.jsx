import ProfileCardSM from '@/Components/Miscellaneous/ProfileCardSM/ProfileCardSM';
import style from './NetworkList.module.css';
import LoadMore from './LoadMore';
import { get_My_Network } from '@/app/server-actions/network/network';
import { GetSession } from '@/lib/utils/getSessionData';

const NetworkList = async () => {

  const loggedInUser = await GetSession();
  const network = await get_My_Network(1, loggedInUser._id);

  return (
    <div className={style.NetworkList}>
      <h2 className={style.heading}>My Network</h2>
      <div className={style.networks}>

        {network?.userNetwork?.map((i) =>
          <ProfileCardSM key={i._id} data={i}/>
        )}

      </div>
        <LoadMore totalPages={network?.totalPages} loggedInUser={loggedInUser._id}/>
    </div>
  )
}

export default NetworkList