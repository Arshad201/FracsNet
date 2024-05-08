import style from "./ProfileImages.module.css";
import { FaRegEdit } from "react-icons/fa";

const ProfileImages = () => {
  return (
    <section className={style.profileImages}>
        <div className="wrapper-width">
            <div className={style.images}>
                <div className={style.bgImage}>
                    <button className={style.editBtn}><FaRegEdit className={style.editIcon} /></button>
                </div>
                <div className={style.profileImage}>
                    <img src="/profile.jpg" alt="" />
                    <button className={style.editBtn}><FaRegEdit className={style.editIcon} /></button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ProfileImages