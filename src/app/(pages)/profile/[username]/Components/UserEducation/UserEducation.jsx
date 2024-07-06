import style from '../../Profile.module.css';
import { FaRegEdit } from "react-icons/fa";
import Link from 'next/link';
import { GetSession } from '@/lib/utils/getSessionData';


const UserEducation = async({ user, education }) => {


    const loggedInUser = await GetSession();

    const schools = education?.schools;
    const collegeOrUniversity = education?.CollegeOrUniversity;

    const formattingDate = (start, end) => {

        if (start && end) {
            return `${start.slice(0, 7)}  To  ${end.slice(0, 7)}`
        }

        if (start && !end) {
            return `${start.slice(0, 7)} - still studying`
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
        <>
            <div className={style.contentBox2}>
                <span className={style.boxTitle}>Education</span>
                <div className={style.schools}>
                    <span className={style.title}>Schools</span>

                    {
                        (schools && schools?.length!=0) ?
                            schools?.map((i) => <div>
                                <span className={style.value}>{i.standard}</span>
                                <span className={style.name}>{i.schoolName}</span>
                                {i.description && 
                                <span className={style.desc}>{i.description}</span>}
                                {i.startDate && 
                                <span className={style.year}>{formattingDate(i.startDate, i.endDate)}</span>}
                            </div>)

                            :

                            <>{formatMsg("Schools")}</>
                    }

                </div>
                <div className={style.schools}>
                    <span className={style.title}>College or University</span>

                    {
                        (collegeOrUniversity && collegeOrUniversity?.length!=0) ?
                            collegeOrUniversity?.map(i => <div>
                                <span className={style.value}>{i.program}</span>
                                <span className={style.name}>{i.instituteName}</span>
                                {i.description && 
                                <span className={style.desc}>{i.description}</span>}
                                {i.startDate &&
                                <span className={style.year}>{formattingDate(i.startDate, i.endDate)}</span>}
                            </div>)

                            :

                            <>
                                {formatMsg("College or University")}
                            </>

                    }

                </div>
                {
                    loggedInUser?._id == user?._id &&
                    <Link href={`/profile/${user?.userName}?update=education`} className={style.editBtn}>
                        <FaRegEdit className={style.editIcon} />
                    </Link>
                }
            </div>
        </>

    )
}

export default UserEducation