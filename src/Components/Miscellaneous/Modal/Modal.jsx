"use client"
import style from './Modal.module.css';
import { MdOutlineClose } from "react-icons/md";

const Modal = ({modalHeading, modalContent, setShowModal}) => {

    return (
        <div className={style.modal}>
            <div className={style.modalContainer}>
                <button className={style.modalCloseBtn} onClick={()=>setShowModal(false)}>
                    <MdOutlineClose className={style.icon} />
                </button>
                <h1 className='sectionHeading'>{modalHeading}</h1>
                {modalContent}
            </div>
        </div>
    )
}

export default Modal