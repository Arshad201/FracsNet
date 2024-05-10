"use client";
import { useState } from 'react';
import style from './ContactDetailsForm.module.css';

const ContactDetailsForm = () => {

    const [contactDetailsForm, setContactDetailsForm] = useState(true);
    const [socialLinksForm, setSocialLinksForm] = useState(false);


    const handleShowForm = (formName) => {

        if (formName === "conDetails") {
            setContactDetailsForm(true);
            setSocialLinksForm(false);
        }

        if (formName === "socialLinksForm") {
            setContactDetailsForm(false);
            setSocialLinksForm(true);
        }

    }

    return (
        <>
            <div className={style.formOptions}>
                <button className={`${style.btn} ${contactDetailsForm && style.activeBtn}`} onClick={() => handleShowForm("conDetails")}>Update Contact Details</button>
                <button className={`${style.btn} ${socialLinksForm && style.activeBtn}`} onClick={() => handleShowForm("socialLinksForm")}>Update Social Links</button>
            </div>
            {/* Contact Details Form */}
            {contactDetailsForm && <form className={style.UE_form}>

                <div className={style.inputGroup}>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="text" id="phoneNumber" name="phoneNumber" required />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="address">Home or Office Address</label>
                    <input type="text" id="address" name="address" required />
                </div>

                <button className={style.btn} type="submit">Save changes</button>
            </form>}

            {/* Social Links form */}
            {socialLinksForm && <form className={style.UE_form}>

                <div className={style.inputGroup}>
                    <label htmlFor="facebook">Facebook URL</label>
                    <input type="text" id="facebook" name="facebook" required />
                </div>

                <div className={style.inputGroup}>
                    <label htmlFor="instagram">Instagram URL</label>
                    <input type="text" id="instagram" name="instagram" required />
                </div>

                <div className={style.inputGroup}>
                    <label htmlFor="linkedin">LinkedIn URL</label>
                    <input type="text" id="linkedin" name="linkedin" required />
                </div>

                <div className={style.inputGroup}>
                    <label htmlFor="X">X URL</label>
                    <input type="text" id="X" name="X" required />
                </div>

                <div className={style.inputGroup}>
                    <label htmlFor="website">Website URL</label>
                    <input type="text" id="website" name="website" required />
                </div>



                <button className={style.btn} type="submit">Save changes</button>
            </form>}
        </>
    )
}

export default ContactDetailsForm