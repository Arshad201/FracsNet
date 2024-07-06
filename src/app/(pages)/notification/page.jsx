import Link from 'next/link';
import style from './NotificationPage.module.css';
import NotificationMessage from './components/NotificationMessage';
import Settings from '@/Components/Miscellaneous/Settings/Settings';

const NotificationPage = () => {
  return (
    <section className={style.notificationsBox}>
      <div className='wrapper-width'>
        <div className={style.notifications}>
          <div></div>
          <div className={`${style.notificationList}`}>
            <div className={style.messageHistory} >
              <h3>Recent Notifications</h3>
              <div className={style.user} >
                <Link href={`/profile/username`} className={style.userImage} >
                  <img src="/profile.jpg" alt="" />
                </Link>
                <div className={style.usernameWrapper} >
                  <p className={style.lastmessage} >
                    <NotificationMessage />
                  </p>
                </div>
                <Settings settingOptions={[]} />
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  )
}

export default NotificationPage