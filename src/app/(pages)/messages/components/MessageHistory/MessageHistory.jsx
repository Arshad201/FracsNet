import Link from 'next/link'
import style from './MessageHistory.module.css'
import Settings from '@/Components/Miscellaneous/Settings/Settings'

const MessageHistory = () => {
    return (
        <div className={style.messageHistory} >
            <h3>Recent Chats</h3>
            <Link scroll={false} href={`/messages?show=chat`} className={style.user} >
                <div className={style.userImage} >
                    <span className={`${style.active} ${style.inactive}`}></span>
                    <img src="/profile.jpg" alt="" />
                </div>
                <div className={style.usernameWrapper} >
                    <h5 className={style.username} >John Doe</h5>
                    <p className={style.lastmessage} >Lorem ipsum dolor sit amet....</p>
                    <span className={style.activeText} >Sent 2 Minutes ago</span>
                </div>
                <Settings settingOptions={[]}/>

            </Link>
        </div>
    )
}

export default MessageHistory