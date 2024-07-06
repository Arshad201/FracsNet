import style from "../../SingleGroupPage.module.css";

const GroupJoinButton = ({ loggedInUser, group }) => {


    const isjoined = group.members.some(obj => obj._id === loggedInUser);

    return (
        <>

            {
                isjoined &&
                <button className={style.btn}>Joined</button>
            }
            {
                !isjoined &&
                <button className={style.btn}>Join</button>
            }

        </>
    )
}

export default GroupJoinButton