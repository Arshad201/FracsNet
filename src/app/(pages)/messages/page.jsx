import style from './Messages.module.css';
import Link from 'next/link';
import Chat from './components/Chat/Chat';
import SendMessageForm from './components/Chat/SendMessageForm/SendMessageForm';
import Users from './components/Users/Users';
import MessageHistory from './components/MessageHistory/MessageHistory';

const Messages = ({ searchParams }) => {

  const { show } = searchParams;

  return (
    <section className={style.messagesBox}>
      <div className='wrapper-width'>

        <div className={style.activeUsers} >
          <Users/>
        </div>

        <div className={style.messages}>
          <div className={`${style.messageHistory} ${show === "chat" && style.hideRecentChats}`}>
            <MessageHistory/>
          </div>
          <div className={`${style.chat}  ${show === "recent-chat" && style.hideChats}`}>
            
            <Chat/>
            <SendMessageForm/>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Messages