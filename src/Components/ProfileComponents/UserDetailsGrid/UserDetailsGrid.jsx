import style from './UserDetailsGrid.module.css'
import { FaRegEdit } from "react-icons/fa";
import { GoGlobe } from "react-icons/go";
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";
import Link from 'next/link';


const UserDetailsGrid = () => {
  return (
    <section className={style.section}>
        <div className="wrapper-width">
            <div className={style.UserDetailsGrid}>
                <div className={style.contentBox1}>
                    <span className={style.username}>@arshad786</span>
                    <h1 className='sectionHeading'>Mohammad Arshad</h1>
                    <span className={style.designation}>Web Developer</span>
                    <p className={style.bio}>"Crafting digital experiences one line of code at a time. Web developer with a passion for innovation and pixel-perfect design."</p>
                    <button className={style.btn}>Connect</button>
                    <button className={style.editBtn}><FaRegEdit className={style.editIcon} /></button>
                </div>
                <div className={style.contentBox2}>
                    <span className={style.boxTitle}>Education</span>
                    <div className={style.schools}>
                        <span className={style.title}>Schools</span>

                        <div>
                            <span className={style.value}>High School</span>
                            <span className={style.name}>Saraswati vidya mandir</span>
                            <span className={style.desc}>A bustling hub of learning, where curious minds explore, question, and grow amidst a vibrant tapestry of knowledge and discovery.</span>
                            <span className={style.year}>2015 - 2017</span>
                        </div>
                        
                        <div>
                            <span className={style.value}>Intermediate</span>
                            <span className={style.name}>Christ Church College</span>
                            <span className={style.desc}>A bustling hub of learning, where curious minds explore, question, and grow amidst a vibrant tapestry of knowledge and discovery.</span>
                            <span className={style.year}>2017 - 2019</span>
                        </div>
                    </div>
                    <div className={style.schools}>
                        <span className={style.title}>University</span>

                        <div>
                            <span className={style.value}>Bachelor of Technology (B.Tech)</span>
                            <span className={style.name}>Chandigarh University</span>
                            <span className={style.desc}>A bustling hub of learning, where curious minds explore, question, and grow amidst a vibrant tapestry of knowledge and discovery.</span>
                            <span className={style.year}>2020 - 2024</span>
                        </div>
                        
                        <div>
                            <span className={style.value}>Masters in Business Administration</span>
                            <span className={style.name}>Said business Shool, Oxford University</span>
                            <span className={style.desc}>A bustling hub of learning, where curious minds explore, question, and grow amidst a vibrant tapestry of knowledge and discovery.</span>
                            <span className={style.year}>2024 - Present</span>
                        </div>
                    </div>
                    <button className={style.editBtn}><FaRegEdit className={style.editIcon} /></button>
                </div>
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
                <div className={style.contentBox4}>
                    <span className={style.boxTitle}>Contact</span>
                    <div>
                    <span className={style.title}>Phone Number</span>
                        <span className={style.value}>1234567890</span>
                    </div>
                    <div>
                        <span className={style.title}>Email</span>
                        <span className={style.value}>example@mail.com</span>
                    </div>
                    <div>
                        <span className={style.title}>Address</span>
                        <span className={style.value}>123, ABC Street, New Delhi, India</span>
                    </div>
                    <div className={style.socialMediaLinks}>
                        <Link href={"/"}><GoGlobe className={style.socialIcon} /></Link>
                        <Link href={"/"}><FaFacebookF className={style.socialIcon} /></Link>
                        <Link href={"/"}><BsInstagram className={style.socialIcon} /></Link>
                        <Link href={"/"}><RiTwitterXLine className={style.socialIcon} /></Link>
                        <Link href={"/"}><FaLinkedinIn className={style.socialIcon} /></Link>   
                    </div>
                    <button className={style.editBtn}><FaRegEdit className={style.editIcon} /></button>
                </div>
                
            </div> 
        </div>
    </section>
  )
}

export default UserDetailsGrid