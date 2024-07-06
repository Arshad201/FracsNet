import style from '../../Profile.module.css';
import { MdOutlinePoll, MdOutlineReportGmailerrorred } from "react-icons/md";
import { BsThreads } from "react-icons/bs";
import { BsPostcard } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegShareSquare } from "react-icons/fa";


const ProfileSetting = () => {

    const options = [
        {
            title: "Create a Poll",
            type: "link",
            icon: <MdOutlinePoll/>
        },
        {
            title: "Create a Thread",
            type: "link",
            icon: <BsThreads/>
        },
        {
            title: "Create a Blogpost",
            type: "link",
            icon: <BsPostcard/>
        },
        {
            title: "Create a Group",
            type: "link",
            icon: <GrGroup/>
        },
        {
            title: "Refer FracsNet",
            type: "btn",
            icon: <MdOutlineCurrencyExchange/>
        },
        {
            title: "Change Password",
            type: "btn",
            icon: <GrUpdate/>
        },
        {
            title: "Delete Account",
            type: "btn",
            icon: <AiOutlineDelete/>
        },
        {
            title: "Share Account",
            type: "btn",
            icon: <FaRegShareSquare/>
        },
        {
            title: "Report to FracsNet",
            type: "btn",
            icon: <MdOutlineReportGmailerrorred/>
        }
    ]
  return (
    <div className={style.profileSetting}>
        <h2 className="sectionHeading">Options</h2>
        {options.map(i=><button key={i.title} className={style.setting}>{i.icon}{i.title}</button>)}
    </div>
  )
}

export default ProfileSetting