import style from './WelcomeToHome.module.css';
import { MdOutlinePermMedia, MdOutlinePoll } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";

const WelcomeToHome = () => {
  return (
    <div className={style.WelcomeToHome}>
        <h1 className="sectionHeading">Welcome to FracsNet, Mohammad Arshad</h1>
        <div className={style.threadPostingCard}>
            <div className={style.profileImageBox}>
                <img src="/profile.jpg" alt="" />
            </div>
            <div className={style.pseudoForm}>
                Post a thread to get answers very fast!
            </div>
            <div className={style.features}>
                <div className={style.feature}>
                    <MdOutlinePermMedia className={style.featureIcon} /> Media
                </div>
                <div className={style.feature}>
                    <MdOutlinePoll className={style.featureIcon} /> Poll
                </div>
                <div className={style.feature}>
                    <IoDocumentTextOutline className={style.featureIcon} /> Document
                </div>
            </div>
        </div>
    </div>
  )
}

export default WelcomeToHome