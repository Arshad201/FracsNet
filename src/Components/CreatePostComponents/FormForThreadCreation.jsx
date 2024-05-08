import style from "./FormForThreadCreation.module.css";
import { MdInsertPhoto, MdOndemandVideo, MdOutlineAudioFile, MdVisibility } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { GoFileDirectoryFill } from "react-icons/go";
import { CgPoll } from "react-icons/cg";

const FormForThreadCreation = () => {
  return (
    <div className={style.FormForThreadCreation}>
        <h1 className="sectionHeading">Create a Thread!</h1>
        <div className={style.threadCreation}>
            <div className={style.header}>
                <div className={style.userProfile}>
                    {/* Profile Photo  */}
                    <div className={style.profileImgWrapper}>
                        <img src="/profile.jpg" alt="" /> 
                    </div>
                    <div className={style.metaData}>
                        <span className={style.userName}>John Doe</span>
                        {/* <span className={style.postedOn}>Web Developer</span> */}
                    </div>
                </div>
            </div>
            <div className={style.body}>
                <div className={style.formFeatures}>
                    <div className={style.options}>
                        <MdInsertPhoto className={style.icons} />
                        <span>
                            Add photo
                        </span>
                    </div>
                    <div className={style.options}>
                        <MdOndemandVideo className={style.icons} />
                        <span>
                            Add Video
                        </span>
                    </div>
                    <div className={style.options}>
                        <FaYoutube className={style.icons} />
                        <span>
                            Add Youtube video
                        </span>
                    </div>
                    <div className={style.options}>
                        <MdOutlineAudioFile className={style.icons} />
                        <span>
                            Add Audio
                        </span>
                    </div>
                    <div className={style.options}>
                        <GoFileDirectoryFill className={style.icons} />
                        <span>
                            Attach a file
                        </span>
                    </div>
                    <div className={style.options}>
                        <CgPoll className={style.icons} />
                        <span>
                            Start a poll
                        </span>
                    </div>
                    <div className={style.options}>
                        <MdVisibility className={style.icons} />
                        <span>
                            Add visibility
                        </span>
                    </div>
                </div>
                <form action="" className={style.form}>
                    <textarea placeholder="Write a thread..."></textarea>
                    <button>Post</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default FormForThreadCreation