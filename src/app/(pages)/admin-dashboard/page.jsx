import style from './AdminDashBoard.module.css';
import Link from 'next/link';
import Users from './components/Users/Users';
import Threads from './components/Threads/Threads';
import Polls from './components/Polls/Polls';
import Jobs from './components/Jobs/Jobs';
import Blogposts from './components/Blogposts/Blogposts';
import Groups from './components/Groups/Groups';
import Comments from './components/Comments/Comments';
import Messages from './components/Messages/Messages';
import Notifications from './components/Notifications/Notifications';
import Replies from './components/Replies/Replies';
import SetSearchParams from './components/SetSearchParams/SetSearchParams';

const AdminDashBoard = ({ searchParams }) => {

  const { content } = searchParams;


  return (
    <section className={style.AdminDashBoard}>
      <div className='wrapper-width'>

        <SetSearchParams />
        <div className={style.topBar} >
          <h1 className='sectionHeading'>Admin Dashboard - A Control Panel of FracsNet</h1>
        </div>

        <div className={style.dashBoardItems}>
          <div className={style.sideBar}>
            <Link scroll={false} href={`/admin-dashboard?content=users`} className={`${style.menuItems} ${content === "users" && style.activeMenuItems}`}>Users</Link>
            <Link scroll={false} href={`/admin-dashboard?content=threads`} className={`${style.menuItems} ${content === "threads" && style.activeMenuItems}`}>Threads</Link>
            <Link scroll={false} href={`/admin-dashboard?content=polls`} className={`${style.menuItems} ${content === "polls" && style.activeMenuItems}`}>Polls</Link>
            <Link scroll={false} href={`/admin-dashboard?content=jobs`} className={`${style.menuItems} ${content === "jobs" && style.activeMenuItems}`}>Jobs</Link>
            <Link scroll={false} href={`/admin-dashboard?content=blogposts`} className={`${style.menuItems} ${content === "blogposts" && style.activeMenuItems}`}>Blogposts</Link>
            <Link scroll={false} href={`/admin-dashboard?content=groups`} className={`${style.menuItems} ${content === "groups" && style.activeMenuItems}`}>Groups</Link>
            <Link scroll={false} href={`/admin-dashboard?content=comments`} className={`${style.menuItems} ${content === "comments" && style.activeMenuItems}`}>Comments</Link>
            <Link scroll={false} href={`/admin-dashboard?content=replies`} className={`${style.menuItems} ${content === "replies" && style.activeMenuItems}`}>Replies</Link>
            <Link scroll={false} href={`/admin-dashboard?content=messages`} className={`${style.menuItems} ${content === "messages" && style.activeMenuItems}`}>Messages</Link>
            <Link scroll={false} href={`/admin-dashboard?content=notifications`} className={`${style.menuItems} ${content === "notifications" && style.activeMenuItems}`}>Notifications</Link>
          </div>
          <div className={style.content}>
            {content === "users" && <Users />}
            {content === "threads" && <Threads />}
            {content === "polls" && <Polls />}
            {content === "jobs" && <Jobs />}
            {content === "blogposts" && <Blogposts />}
            {content === "groups" && <Groups />}
            {content === "comments" && <Comments />}
            {content === "replies" && <Replies />}
            {content === "messages" && <Messages />}
            {content === "notifications" && <Notifications />}
          </div>
        </div>

      </div>
    </section>
  )
}

export default AdminDashBoard