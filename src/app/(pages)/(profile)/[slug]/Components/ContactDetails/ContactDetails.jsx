"use client";
import style from '../../Profile.module.css';
import { FaRegEdit } from "react-icons/fa";
import Modal from '@/Components/Miscellaneous/Modal/Modal';
import { useState } from 'react';
import Link from 'next/link';
import { GoGlobe } from "react-icons/go";
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";
import ContactDetailsForm from '@/Components/Miscellaneous/Forms/ContactDetailsForm/ContactDetailsForm';


const ContactDetails = () => {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal &&
                <Modal
                    modalHeading={"Update Contact Details"}
                    modalContent={<ContactDetailsForm />}
                    setShowModal={setShowModal}
                />}
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
                <button className={style.editBtn} onClick={() => setShowModal(true)}>
                    <FaRegEdit className={style.editIcon} />
                </button>
            </div>
        </>

    )
}

export default ContactDetails