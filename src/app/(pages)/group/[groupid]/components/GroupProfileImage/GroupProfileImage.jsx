"use client";
import { useState } from 'react';
import style from '../../SingleGroupPage.module.css'
import { FaRegEdit } from "react-icons/fa";
import Modal from '@/Components/Miscellaneous/Modal/Modal';
import ImageDropperCropper from '@/Components/Miscellaneous/ImageDropperCropper/ImageDropperCropper';


const GroupProfileImage = ({group}) => {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal &&
                <Modal
                    modalHeading={"Update Profile Image"}
                    modalContent={<ImageDropperCropper imgType={"pofile"} />}
                    setShowModal={setShowModal}
                />}
            <div className={style.groupImg}>
                <img src={group.groupImage.url} alt="" />
                <button className={style.editBtn} onClick={() => setShowModal(true)}>
                    <FaRegEdit className={style.editIcon} />
                </button>
            </div>
        </>
    )
}

export default GroupProfileImage