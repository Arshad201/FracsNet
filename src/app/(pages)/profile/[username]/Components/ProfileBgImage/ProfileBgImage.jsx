import style from '../../Profile.module.css'
import { FaRegEdit } from "react-icons/fa";
import Link from 'next/link';
import { GetSession } from '@/lib/utils/getSessionData';


const ProfileBgImage = async({ user }) => {

    const loggedInUser = await GetSession();

    return (
        <>
            <div className={style.bgImage} style={{ backgroundImage: `url(${user.bgPic.url})` }}>

                {
                    loggedInUser?._id == user?._id &&
                    <Link href={`/profile/${user?.userName}?update=bgImage`} className={style.editBtn}>
                        <FaRegEdit className={style.editIcon} />
                    </Link>
                }
            </div>
        </>
    )
}

export default ProfileBgImage