import style from './WelcomeToHome.module.css';
import { MdOutlinePermMedia, MdOutlinePoll } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import Link from 'next/link';
import { formattingName } from '@/lib/utils/valueFormatting';
import { get_loggedIn_user } from '@/lib/data/user';

const WelcomeToHome = async() => {

  const user = await get_loggedIn_user();

  return (
    <div className={style.WelcomeToHome}>
        <h1 className="sectionHeading">Welcome to FracsNet, {formattingName(user)}</h1>
        <div className={style.threadPostingCard}>
            <Link href={`/profile/${user.userName}`} className={style.profileImageBox}>
                <img src={user.profilePic.url} alt="" />
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