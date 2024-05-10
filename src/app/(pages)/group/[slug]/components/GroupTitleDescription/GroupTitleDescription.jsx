"use client";
import { useState } from 'react';
import style from '../../SingleGroupPage.module.css';
import { FaRegEdit } from "react-icons/fa";
import Modal from '@/Components/Miscellaneous/Modal/Modal';
import ImageDropperCropper from '@/Components/Miscellaneous/ImageDropperCropper/ImageDropperCropper';
import GroupTitleDescriptionForm from '@/Components/Miscellaneous/Forms/GroupTitleDescriptionForm/GroupTitleDescriptionForm';


const GroupTitleDescription = () => {

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
                <h1 className={'sectionHeading'}>Indian MERN Developer</h1>
                <p className={style.groupDescription}>"Welcome to our vibrant MERN Stack Developers community! 🚀 Dive into the world of full-stack development with MongoDB, Express.js, React, and Node.js. Whether you're a seasoned pro or just starting your journey, our group offers a supportive space to share insights, collaborate on projects, and stay updated on the latest trends and tools in web development. Join us to connect with like-minded developers, brainstorm innovative solutions, and elevate your skills in building dynamic, modern web applications. Let's code, learn, and grow together in this exciting tech ecosystem!"</p>
            </div>
        </>
    )
}

export default GroupTitleDescription