import Link from 'next/link';
import style from './Chat.module.css';
import { IoReturnUpBackSharp } from "react-icons/io5";

const Chat = () => {
    return (
        <div className={style.chat} >
            <div className={style.user} >
                <Link scroll={false} className={style.backBtn} href={`/messages?show=recent-chat`}><IoReturnUpBackSharp className={style.icon} /></Link>
                <Link href={`/profile/id`} className={style.userImage} >
                    <span className={`${style.active} ${style.inactive}`}></span>
                    <img src="/profile.jpg" alt="" />
                </Link>
                <div className={style.usernameWrapper} >
                    <Link href={`/profile/id`} className={style.username} >John Doe</Link>
                    <span className={style.activeText} >Active Now</span>
                </div>
            </div>

            <div className={style.chats} >
                <div className={style.sender}>
                    <span className={`${style.msg}`} >Sender Message</span>
                    <span className={style.msgTime}>1 hour ago</span>
                </div>
                <div className={style.receiver}>
                    <span className={`${style.msg}`} >Receiver Message</span>
                    <span className={style.msgTime}>1 hour ago</span>
                </div>
                <div className={style.sender}>
                    <span className={`${style.msg}`} >Sender Message</span>
                    <span className={style.msgTime}>1 hour ago</span>
                </div>
                <div className={style.receiver}>
                    <span className={`${style.msg}`} >Receiver Message</span>
                    <span className={style.msgTime}>1 hour ago</span>
                </div>
                <div className={style.sender}>
                    <span className={`${style.msg}`} >Sender Message</span>
                    <span className={style.msgTime}>1 hour ago</span>
                </div>
                <div className={style.receiver}>
                    <span className={`${style.msg}`} >Receiver Message</span>
                    <span className={style.msgTime}>1 hour ago</span>
                </div>
            </div>


        </div>
    )
}

export default Chat