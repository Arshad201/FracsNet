import style from './WelcomeToHome.module.css';
import { MdOutlinePermMedia, MdOutlinePoll } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import Link from 'next/link';
import ProfileImageSkeleton from './ProfileImageSkeleton';

const WelcomeToHome = () => {
  return (
    <div className={style.WelcomeToHome}>
        <h1 className="sectionHeading">Welcome to FracsNet, Mohammad Arshad</h1>
        <div className={style.threadPostingCard}>
            {/* <ProfileImageSkeleton/> */}
            <Link href={"/"} className={style.profileImageBox}>
                <img src="/profile.jpg" alt="" />
            </Link>
            <Link href={"/create"} className={style.pseudoForm}>
                Post a thread to get answers very fast!
            </Link>
            <div className={style.features}>
                <Link href={"/create"} className={style.feature}>
                    <MdOutlinePermMedia className={style.featureIcon} /> Media
                </Link>
                <Link href={"/create"} className={style.feature}>
                    <MdOutlinePoll className={style.featureIcon} /> Poll
                </Link>
                <Link href={"/create"} className={style.feature}>
                    <IoDocumentTextOutline className={style.featureIcon} /> Document
                </Link>
            </div>
        </div>
    </div>
  )
}

export default WelcomeToHome