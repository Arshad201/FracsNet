import style from '../../Profile.module.css';
import { FaRegEdit } from "react-icons/fa";
import Link from 'next/link';
import { GetSession } from '@/lib/utils/getSessionData';


const PromotionalVideo = async ({ user }) => {

    const loggedInUser = await GetSession();

    return (
        <div className={style.videoBox}>

            {
                user?.promotionalVideo
                    ?
                    <>
                        <video src={user?.promotionalVideo?.url} controls autoPlay></video>
                        {
                            loggedInUser?._id == user._id &&
                            <Link href={`/profile/${user.userName}?update=promotional_video`} className={style.editBtn}>
                                <FaRegEdit className={style.editIcon} />
                            </Link>
                        }
                    </>
                    :

                    <>

                        {loggedInUser?._id == user._id &&
                            <div className={style.notHaveVideo} >
                                <span className='sectionHeading'>"Engage and Convert: Upload a Winning Promotional Video!"</span>
                                <Link href={`/profile/${user.userName}?update=promotional_video`} className={style.btn} >Upload a Video</Link>
                            </div>
                        }

                    </>



            }

        </div>
    )
}

export default PromotionalVideo