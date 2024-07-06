"use client";
import { useState } from 'react';
import style from '../../SingleGroupPage.module.css';
import { FaRegEdit } from "react-icons/fa";
import Modal from '@/Components/Miscellaneous/Modal/Modal';
import ImageDropperCropper from '@/Components/Miscellaneous/ImageDropperCropper/ImageDropperCropper';
import GroupTitleDescriptionForm from '@/Components/Miscellaneous/Forms/GroupTitleDescriptionForm/GroupTitleDescriptionForm';


const GroupTitleDescription = ({group}) => {


    const [showModal, setShowModal] = useState(false);

    return (

        <>
            {showModal &&
                <Modal
                    modalHeading={"Update Group Title and Description"}
                    modalContent={<GroupTitleDescriptionForm />}
                    setShowModal={setShowModal}
                />}
            <div className={style.groupTitleAndDesc}>
                <button className={style.editBtn} onClick={() => setShowModal(true)}>
                    <FaRegEdit className={style.editIcon} />
                </button>
                <h1 className={'sectionHeading'}>{group.groupTitle}</h1>
                <p className={style.groupDescription}>"{group.groupDescription}"</p>
            </div>
        </>
    )
}

export default GroupTitleDescription