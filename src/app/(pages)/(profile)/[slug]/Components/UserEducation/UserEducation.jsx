"use client";
import style from '../../Profile.module.css';
import { FaRegEdit } from "react-icons/fa";
import Modal from '@/Components/Miscellaneous/Modal/Modal';
import { useState } from 'react';
import UserEducationForm from '@/Components/Miscellaneous/Forms/UserEducationForm/UserEducationForm';


const UserEducation = () => {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal &&
                <Modal
                    modalHeading={"Update Education"}
                    modalContent={<UserEducationForm />}
                    setShowModal={setShowModal}
                />}
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
                    <span className={style.title}>College or University</span>

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
                <button className={style.editBtn} onClick={() => setShowModal(true)}>
                    <FaRegEdit className={style.editIcon} />
                </button>
            </div>
        </>

    )
}

export default UserEducation