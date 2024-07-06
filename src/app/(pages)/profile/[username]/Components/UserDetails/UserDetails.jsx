import style from '../../Profile.module.css';
import { FaRegEdit } from "react-icons/fa";
import { formattingV } from '@/lib/utils/valueFormatting';
import Link from 'next/link';
import { GetSession } from '@/lib/utils/getSessionData';


const UserDetails = async({ user }) => {

    const loggedInUser = await GetSession();

    return (
        <>
            <div className={style.contentBox1}>
                <span className={style.username}>{formattingV("username", user, loggedInUser?._id)}</span>
                <h1 className='sectionHeading'>{formattingV("name", user)}</h1>
                <span className={style.designation}>{formattingV("designation", user, loggedInUser?._id)}</span>
                <p className={style.bio}>{formattingV("bio", user, loggedInUser?._id)}</p>

                {loggedInUser?._id != user._id && <button className={style.btn}>Connect</button>}

                {
                    loggedInUser?._id == user._id &&
                    <Link href={`/profile/${user?.userName}?update=userInfo`} className={style.editBtn}>
                        <FaRegEdit className={style.editIcon} />
                    </Link>
                }

            </div>
        </>
    )
}

export default UserDetails