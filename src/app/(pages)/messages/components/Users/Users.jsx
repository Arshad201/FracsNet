import Link from 'next/link';
import style from './Users.module.css';

const Users = () => {
  return (
    <div className={style.Users}>
        <div className={style.activeUsers}>
            <h2>Active Users</h2>
            <div className={style.row} >
                <div className={style.user} >
                    <Link href={`/profile/id`} className={style.userImage} >
                        <span className={`${style.active} ${style.inactive}`}></span>
                        <img src="/profile.jpg" alt="" />
                    </Link>
                    <div className={style.usernameWrapper} >
                        <Link href={`/profile/id`} className={style.username} >John Doe</Link>
                        <span className={style.activeText} >Active Now</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Users