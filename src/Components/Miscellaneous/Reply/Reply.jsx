import style from './Reply.module.css';

import { BiLike, BiSolidLike } from "react-icons/bi";
import CommentForm from '../CommentForm/CommentForm';
import { useState } from 'react';

const Reply = () => {

    const [show, setShow] = useState(false);

  return (
    <div className={style.commentWrapper}>
        {/* Comment form */}
       {/* <CommentForm/> */}
        
        {/* Comments */}
        <h6 className={style.heading}>4 Replies</h6>
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
            </div>
        </div>
        {show && <CommentForm type={"reply"}/>}
    </div>
  )
}

export default Reply