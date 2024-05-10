"use client";
import { useState } from 'react';
import style from '../../Profile.module.css'
import { FaRegEdit } from "react-icons/fa";
import Modal from '@/Components/Miscellaneous/Modal/Modal';
import ImageDropperCropper from '@/Components/Miscellaneous/ImageDropperCropper/ImageDropperCropper';


const ProfileImage = () => {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal &&
                <Modal
                    modalHeading={"Update Profile Image"}
                    modalContent={<ImageDropperCropper imgType={"pofile"} />}
                    setShowModal={setShowModal}
                />}

            <div className={style.profileImage}>
                <img src="/profile.jpg" alt="" />
                <button className={style.editBtn} onClick={() => setShowModal(true)}>
                    <FaRegEdit className={style.editIcon} />
                </button>
            </div>
        </>
    )
}

export default ProfileImage