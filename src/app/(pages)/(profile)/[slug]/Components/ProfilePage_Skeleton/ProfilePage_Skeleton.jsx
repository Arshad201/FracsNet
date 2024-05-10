import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import style from '../../Profile.module.css';
import ProfileBgImage from '../ProfileBgImage/ProfileBgImage';
import ProfileImage from '../ProfileImage/ProfileImage';
import ProfileBgImage_Skeleton from './ProfileBgImage_Skeleton';

const ProfilePage_Skeleton = () => {
    return (
        <>
            <section className={style.profileImages} style={{background: 'white'}}>
                <div className="wrapper-width">
                    <div className={style.images}>
                        <ProfileBgImage_Skeleton/>
                        {/* <ProfileBgImage /> */}
                        <ProfileImage />
                    </div>
                </div>
            </section>
            {/* <section className={style.section}>
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
        </>

    )
}

export default ProfilePage_Skeleton