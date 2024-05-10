import style from "./Profile.module.css";
import { FaRegEdit } from "react-icons/fa";
import ProfileBgImage from "./Components/ProfileBgImage/ProfileBgImage";
import ProfileImage from "./Components/ProfileImage/ProfileImage";
import UserDetails from "./Components/UserDetails/UserDetails";
import UserEducation from "./Components/UserEducation/UserEducation";
import ContactDetails from "./Components/ContactDetails/ContactDetails";
import ProfilePage_Skeleton from "./Components/ProfilePage_Skeleton/ProfilePage_Skeleton";

const ProfilePage = () => {
  return (
    <>
      {/* <section className={style.profileImages}>
        <div className="wrapper-width">
          <div className={style.images}>
            <ProfileBgImage />
            <ProfileImage />
          </div>
        </div>
      </section>
      <section className={style.section}>
        <div className="wrapper-width">
          <div className={style.UserDetailsGrid}>
            <UserDetails />
            <UserEducation />
            <div className={style.contentBox3}>
              <span className={style.boxTitle}>Work Experience</span>
              <div className={style.schools}>

                <div>
                  <span className={style.value}>Project Manager</span>
                  <span className={style.name}>at Google</span>
                  <span className={style.desc}>A bustling hub of learning, where curious minds explore, question, and grow amidst a vibrant tapestry of knowledge and discovery.</span>
                  <span className={style.year}>2022 - 2023</span>
                </div>

                <div>
                  <span className={style.value}>Fullstack Developer</span>
                  <span className={style.name}>at Amazon</span>
                  <span className={style.desc}>A bustling hub of learning, where curious minds explore, question, and grow amidst a vibrant tapestry of knowledge and discovery.</span>
                  <span className={style.year}>2022 - 2023</span>
                </div>

              </div>
              <button className={style.editBtn}><FaRegEdit className={style.editIcon} /></button>
            </div>
            <ContactDetails />
          </div>
        </div>
      </section> */}
      <ProfilePage_Skeleton/>
    </>
  )
}

export default ProfilePage