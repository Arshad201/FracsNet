import style from './GroupList.module.css';
import GroupCardSM from '@/Components/Miscellaneous/GroupCardSM/GroupCardSM';
import { get_My_JoinedGroups, get_suggestedGroups } from '@/app/server-actions/group/group';
import LoadMore from './LoadMore.jsx';
import { GetSession } from '@/lib/utils/getSessionData';


const GroupList = async ({ listType }) => {

  const loggedInUser = await GetSession();
  const joinedGroup = await get_My_JoinedGroups(1, loggedInUser._id);
  const suggestedGroup = await get_suggestedGroups(1, loggedInUser._id);

  return (
    <>
      {listType === "joinedGroup" && <div className={style.GroupList}>
        <h2 className={style.heading}>Joined Groups</h2>
        <div className={style.networks}>
          {joinedGroup?.groups?.map((i) =>
            <GroupCardSM key={i._id} data={i} groupCardType="joined" />
          )}
        </div>
        <LoadMore totalPages={joinedGroup?.totalPages} loggedInUser={loggedInUser._id} groupCardType="joined" />
      </div>}

      {listType === "suggestedGroup" && <div className={style.GroupList}>
        <h2 className={style.heading}>Suggested Groups</h2>
        <div className={style.networks}>
          {suggestedGroup?.groups?.map((i) =>
            <GroupCardSM key={i._id} data={i} groupCardType={"not-joined"} />
          )}
        </div>
        <LoadMore totalPages={suggestedGroup?.totalPages} loggedInUser={loggedInUser._id} groupCardType={"not-joined"} />
      </div>
      }
    </>

  )
}

export default GroupList