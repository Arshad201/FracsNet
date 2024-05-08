import style from './CommentForm.module.css';
import { MdOutlinePermMedia } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

const CommentForm = ({type}) => {
    return (
        <div className={style.commentFormWrapper}>
            {/* <div className={style.imgOutput}>
                <div>
                    <RxCross1 className={style.icon} />
                </div>
                <img src="/profile.jpg" alt="" />
            </div> */}
            <div className={style.commentFormBox}>
                {/* Profile Photo */}
                <div className={style.profilePic}>
                    <img src="/profile.jpg" alt="" />
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <textarea rows={3} placeholder={`Write a ${type}...` }></textarea>
                    {/* <input type="text" /> */}
                    <label htmlFor="uploadMedia"><MdOutlinePermMedia className={style.icon} /></label>
                    <input type="file" className={style.upload} id='uploadMedia' />
                </form>
            </div>
        </div>
    )
}

export default CommentForm