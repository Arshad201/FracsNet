import Link from 'next/link';
import style from '../../Profile.module.css';
import { FaRegEdit } from "react-icons/fa";
import { GetSession } from '@/lib/utils/getSessionData';
import { get_User_Work_Experience } from '@/lib/data/user';


const WorkExperience = async ({ user, experience }) => {

    const loggedInUser = await GetSession();

    const formattingDate = (start, end) => {

        if (start && end) {
            return `${start.slice(0, 7)}  To  ${end.slice(0, 7)}`
        }

        if (start && !end) {
            return `${start.slice(0, 7)} - Still Working`
        }

        if (!start && !end) {
            return "";
        }

    }

    const formatMsg = (key) => {

        let msg = "";
        if (loggedInUser?._id == user?._id) {
            msg = `Add ${key}`;
        } else {
            msg = `${key} is not added yet`
        }

        return <span className={style.value} >{msg}</span>

    }

    return (
        <div className={style.contentBox3}>
            <span className={style.boxTitle}>Work Experience</span>
            <div className={style.schools}>

                {
                    (experience?.workExperience && experience?.workExperience.length !=0) ?
                        experience?.workExperience?.map(ex =>
                            <div key={ex._id}>
                                <span className={style.value}>{ex.designation}</span>
                                <span className={style.name}>at {ex.companyName}</span>
                                {ex.description && 
                                <span className={style.desc}>{ex.description}</span>}
                                {ex.startDate &&
                                <span className={style.year}>{formattingDate(ex.startDate, ex.endDate)}</span>}
                            </div>)

                        :

                        <>
                            {formatMsg("Work Experience")}
                        </>
                }

            </div>
            {
                loggedInUser?._id == user?._id &&
                <Link href={`/profile/${user?.userName}?update=experience`} className={style.editBtn}>
                    <FaRegEdit className={style.editIcon} />
                </Link>
            }
        </div>
    )
}

export default WorkExperience