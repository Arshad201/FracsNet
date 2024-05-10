"use client"
import style from './Comment.module.css';
import { BiLike, BiSolidLike } from "react-icons/bi";
import CommentForm from '../CommentForm/CommentForm';
import Reply from '../Reply/Reply';
import { useState } from 'react';
import Comment_Skeleton from './Comment_Skeleton';

const Comment = () => {

    const [show, setShow] = useState(false);
    const [showReply, setShowReply] = useState(false);
  return (
    <div className={style.commentWrapper}>
        
        {/* Comments */}
        <h6 className={style.heading}>4 Comments</h6>
        <Comment_Skeleton/>
        <div className={style.comment}>
            <div className={style.userDetails}>
                <div className={style.profilePic}>
                    <img src="/profile.jpg" alt="" />
                </div>
                <span className={style.name}>John Doe</span>
            </div>
            <div className={style.commentBody}>
                <div className={style.commentImg}>
                    <img src="/profile.jpg" alt="" />
                </div>
                <p className={style.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quasi ipsam eum dolor error molestiae fugiat sequi, inventore adipisci eius impedit veritatis consequuntur vel, repellat a quia consequatur expedita. Facere numquam repellendus pariatur nam dolore laboriosam, magni nesciunt molestias dicta!</p>
                <span className={style.postedOn}>3 minutes ago</span>
            </div>
            <div className={style.commentFooter}>
                <div className={style.like}>
                    <BiLike className={style.icon}/>
                    3
                </div>
                <button className={style.btn} onClick={()=>setShow(!show)}>Reply</button>
                <div className={style.like} onClick={()=>setShowReply(!showReply)}>
                    3 Replies
                </div>
            </div>
            {show && <CommentForm type={'comment'}/>}
            {showReply && <Reply/>}
        </div>
        <div className={style.comment}>
            <div className={style.userDetails}>
                <div className={style.profilePic}>
                    <img src="/profile.jpg" alt="" />
                </div>
                <span className={style.name}>John Doe</span>
            </div>
            <div className={style.commentBody}>
                <div className={style.commentImg}>
                    <img src="/profile.jpg" alt="" />
                </div>
                <p className={style.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quasi ipsam eum dolor error molestiae fugiat sequi, inventore adipisci eius impedit veritatis consequuntur vel, repellat a quia consequatur expedita. Facere numquam repellendus pariatur nam dolore laboriosam, magni nesciunt molestias dicta!</p>
                <span className={style.postedOn}>3 minutes ago</span>
            </div>
            <div className={style.commentFooter}>
                <div className={style.like}>
                    <BiLike className={style.icon}/>
                    3
                </div>
                <button className={style.btn} onClick={()=>setShow(!show)}>Reply</button>
                <div className={style.like} onClick={()=>setShowReply(!showReply)}>
                    3 Replies
                </div>
            </div>
            {show && <CommentForm type={'comment'}/>}
            {showReply && <Reply/>}
        </div>
        <div className={style.comment}>
            <div className={style.userDetails}>
                <div className={style.profilePic}>
                    <img src="/profile.jpg" alt="" />
                </div>
                <span className={style.name}>John Doe</span>
            </div>
            <div className={style.commentBody}>
                <div className={style.commentImg}>
                    <img src="/profile.jpg" alt="" />
                </div>
                <p className={style.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quasi ipsam eum dolor error molestiae fugiat sequi, inventore adipisci eius impedit veritatis consequuntur vel, repellat a quia consequatur expedita. Facere numquam repellendus pariatur nam dolore laboriosam, magni nesciunt molestias dicta!</p>
                <span className={style.postedOn}>3 minutes ago</span>
            </div>
            <div className={style.commentFooter}>
                <div className={style.like}>
                    <BiLike className={style.icon}/>
                    3
                </div>
                <button className={style.btn} onClick={()=>setShow(!show)}>Reply</button>
                <div className={style.like} onClick={()=>setShowReply(!showReply)}>
                    3 Replies
                </div>
            </div>
            {show && <CommentForm type={'comment'}/>}
            {showReply && <Reply/>}
        </div>
    </div>
  )
}

export default Comment