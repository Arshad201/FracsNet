"use client"
import style from '../../Profile.module.css';
import { FaRegEdit } from "react-icons/fa";
import Modal from '@/Components/Miscellaneous/Modal/Modal';
import { useState } from 'react';
import UserDetailsForm from '@/Components/Miscellaneous/Forms/UserDetailsForm/UserDetailsForm';


const UserDetails = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal &&
                <Modal
                    modalHeading={"Update User Details"}
                    modalContent={<UserDetailsForm/>}
                    setShowModal={setShowModal}
                />}
            <div className={style.contentBox1}>
                <span className={style.username}>@arshad786</span>
                <h1 className='sectionHeading'>Mohammad Arshad</h1>
                <span className={style.designation}>Web Developer</span>
                <p className={style.bio}>"Crafting digital experiences one line of code at a time. Web developer with a passion for innovation and pixel-perfect design."</p>
                <button className={style.btn}>Connect</button>
                <button className={style.editBtn} onClick={() => setShowModal(true)}>
                    <FaRegEdit className={style.editIcon} />
                </button>
            </div>
        </>
    )
}

export default UserDetails