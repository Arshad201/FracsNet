import Link from 'next/link'
import style from '../NotificationPage.module.css'

const NotificationMessage = () => {

    const type = {
        action: "postlike",
        post: 'thread',
        postedIn: "MERN FULL STACK ENGINEERS",
        actionArr: [1, 2, 2],
    }

    return (
        <>
            {(type.actionArr.length === 1 || type.actionArr.length > 2) &&
                <><Link href={`/profile/username`} className={style.username} >John Doe</Link>
                    {type.action === "postlike" && "is liked your"}
                    {type.action === "commentlike" && "is liked your Comment in"}
                    {type.action === "replylike" && "is liked your Reply in"}
                    {type.action === "comment" && "is Commented on your"}
                    {type.action === "reply" && "is Replied to your Comment in"}
                    {type.action === "accept-request" && "is Accept your network request"}
                    {type.action === "admin-message" && "You are violating rules again and again we cannot tolerate, this is the last warning from FracsNet"}
                </>}

            {type.actionArr.length === 2 &&
                <>
                    <Link href={`/profile/username`} className={style.username} >John Doe</Link>
                    &
                    <Link href={`/profile/username`} className={style.username} >Kaif Doe</Link>
                    {type.action === "postlike" && "is liked your"}
                    {type.action === "commentlike" && "is liked your Comment in"}
                    {type.action === "replylike" && "is liked your Reply in"}
                    {type.action === "comment" && "is Commented on your"}
                    {type.action === "reply" && "is Replied to your Comment in"}

                </>}

            <Link className={style.linkBetweenText}
                href={`/thread/id`}>
                {type.post === "thread" && "Thread"}
                {type.post === "poll" && "Poll"}
                {type.post === "job" && "Job Posting"}
            </Link>

            {
                type.actionArr.length > 2 && "with 3 Others"
            }

            {
                type.postedIn !== null &&
                <>
                    <span>in</span><Link className={style.linkBetweenText} href={`/group/name`} >{type.postedIn}</Link>
                </>
            }

            <span className={style.notificationTime} >2 Minutes ago</span>
        </>
    )
}

export default NotificationMessage