import ProfileCardSM from '@/Components/Miscellaneous/ProfileCardSM/ProfileCardSM';
import style from '../../SingleGroupPage.module.css';

const GroupMembers = ({ group, loggedInUser }) => {

    const groupMembers = group.members;

    return (
        <>
            {/* Search form for searching Members */}
            <div className={style.members}>
                <form>
                    <h2 className={style.heading}>Group Members</h2>
                    <input type="search" placeholder="search a member" />
                </form>
                {groupMembers?.map((item, index)=><ProfileCardSM key={index} data={item}/>)}
            </div>
        </>
    )
}

export default GroupMembers