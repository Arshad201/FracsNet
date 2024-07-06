"use client";
import { useContext, useState } from 'react';
import style from './UserDetailsForm.module.css';
import { update_userDetails } from '@/app/server-actions/user/action';
import { StateContext } from '@/app/context/State';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const UserDetailsForm = ({ user }) => {

    const { replace } = useRouter();
    const pathname = usePathname();

    const { setShowAlert } = useContext(StateContext);


    const setvalue = (key) => {
        return user[key] ? user[key] : ""
    }

    const [loading, setLoading] = useState(false);
    const [userDetails, setUserDetails] = useState({
        userName: setvalue("userName"),
        firstName: setvalue("firstName"),
        lastName: setvalue("lastName"),
        designation: setvalue("designation"),
        bio: setvalue("bio"),
    })

    const inputValueHandler = (e) => {

        setUserDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))

    }

    const UserDetailsAction = async (e) => {

        setLoading(true)
        e.preventDefault();

        try {

            const res = await update_userDetails(userDetails);

            if (res.message) {
                setShowAlert({
                    type: "success",
                    message: res.message
                })
            }

            if (res.error) {
                setShowAlert({
                    type: "error",
                    position: "bottom-left",
                    message: res.error
                })
            }

            setLoading(false)


        } catch (error) {
            setLoading(false)

        }

    }

    return (
        <form className={style.Ud_form} onSubmit={UserDetailsAction}>

            <h4 className={style.formHeading} >Details</h4>

            <div className={style.groupInputGroups}>
                <div className={style.inputGroup}>
                    <label htmlFor="userName">Username</label>
                    <input type="text" id="userName" name="userName" value={userDetails?.userName} onChange={(e) => inputValueHandler(e)} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" value={userDetails?.firstName} onChange={(e) => inputValueHandler(e)} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" value={userDetails?.lastName} onChange={(e) => inputValueHandler(e)} />
                </div>
            </div>

            <div className={style.inputGroup}>
                <label htmlFor="designation">Designation</label>
                <input type="text" id="designation" name="designation" value={userDetails?.designation} onChange={(e) => inputValueHandler(e)} />
            </div>

            <div className={style.inputGroup}>
                <label htmlFor="bio">Write about yourself in 25 words</label>
                <textarea rows={4} id="bio" name="bio" value={userDetails?.bio} onChange={(e) => inputValueHandler(e)} ></textarea>
            </div>
            <button type="submit">
                Save changes

                {loading && <AiOutlineLoading3Quarters className={`loadingIcon loadingLight loadingM`} />}
            </button>
            <Link href={`/profile/${user.userName}`} className={"close-btn"} >Close</Link>
        </form>
    )
}

export default UserDetailsForm