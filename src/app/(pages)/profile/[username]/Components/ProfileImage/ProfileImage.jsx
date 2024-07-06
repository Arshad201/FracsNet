import style from '../../Profile.module.css'
import { FaRegEdit } from "react-icons/fa";
import Link from 'next/link';
import { GetSession } from '@/lib/utils/getSessionData';


const ProfileImage = async({ user }) => {

    const loggedInUser = await GetSession();

    return (
        <>

            <div className={style.profileImage}>
                <img src={user.profilePic.url} alt="" />
                {
                    loggedInUser?._id == user._id &&
                    <Link href={`/profile/${user?.userName}?update=profileImage`} className={style.editBtn}>
                        <FaRegEdit className={style.editIcon} />
                    </Link>
                }

            </div>
        </>
    )
}

export default ProfileImage