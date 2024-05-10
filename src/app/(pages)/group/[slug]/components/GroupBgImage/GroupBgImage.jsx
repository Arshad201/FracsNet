"use client";
import Modal from '@/Components/Miscellaneous/Modal/Modal';
import style from '../../SingleGroupPage.module.css'
import { FaRegEdit } from "react-icons/fa";
import ImageDropperCropper from '@/Components/Miscellaneous/ImageDropperCropper/ImageDropperCropper';
import { useState } from 'react';


const GroupBgImage = () => {

    const [showModal, setShowModal] = useState(false);
    return (
        <>
            {showModal &&
                <Modal
                    modalHeading={"Update Background Image"}
                    modalContent={<ImageDropperCropper imgType={"groupCoverImage"} />}
                    setShowModal={setShowModal}
                />}
            <div className={style.groupBGImg}>
                <button className={style.editBtn} onClick={() => setShowModal(true)}>
                    <FaRegEdit className={style.editIcon} />
                </button>
            </div>
        </>
    )
}

export default GroupBgImage