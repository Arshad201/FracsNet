"use client";
import { useContext, useState } from 'react';
import style from './UserExperienceForm.module.css'
import {  update_workingExperience } from '@/app/server-actions/user/action';
import { StateContext } from '@/app/context/State';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import Link from 'next/link';


const UserExperienceForm = ({ user, experience }) => {

    const setInitialValue = (key)=>{
        return experience ? (experience[key] ? experience[key] : []) : []
    }

    const { setShowAlert } = useContext(StateContext);

    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(null);

    const [experienceObj, setExperienceObj] = useState({
        designation: "",
        companyName: "",
        description: "",
        startDate: "",
        endDate: "",
    })
    const [experiences, setExperiences] = useState(setInitialValue("workExperience"))

    const validate = () => {
        if (experienceObj?.companyName.length < 3) {
            setShowAlert({
                type: "error",
                position: "bottom-left",
                message: "Compnay name must have 3 characters"
            })

            return false
        }

        if (experienceObj?.designation.length < 2) {
            setShowAlert({
                type: "error",
                position: "bottom-left",
                message: "Designation must have 3 characters"
            })

            return false
        }

        return true
    }

    const addNMoreItems = (obj) => {

        const isValid = validate();
        if(!isValid) return 

        setExperiences(prev => [...prev, obj])

        setExperienceObj({
            designation: "",
            companyName: "",
            description: "",
            startDate: "",
            endDate: "",
        })
    }

    const settingUpdateVariable = (index, obj) => {
        setUpdate(index)
        setExperienceObj(obj)
    }

    const updateArr = () => {

        const isValid = validate();
        if(!isValid) return 

        setExperiences(prev => prev.map((value, index) => {
            if (index == update) {
                value = experienceObj
                return value
            }

            return value
        }))

        setExperienceObj({
            designation: "",
            companyName: "",
            description: "",
            startDate: "",
            endDate: "",
        })

        setUpdate(null)
    }

    const removeItems = (index, expObj) => {

        if (expObj.companyName === experienceObj.companyName) {

            setUpdate(null)

        }

        setExperiences(prev => prev.filter((_, i) => i != index))


    }

    const inputValueHandler = (e) => {

        setExperienceObj(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const UserExperienceAction = async (e) => {

        
        e.preventDefault();
        setLoading(true)

        try {

            const res = await update_workingExperience(experiences);

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

    const returnMinDate = (monthsToAdd) => {

        let startDate = new Date(experienceObj?.startDate)
        startDate.setMonth(startDate.getMonth() + monthsToAdd)

        let year = startDate.getFullYear();
        let month = ('0' + (startDate.getMonth() + 1)).slice(-2);
        let day = ('0' + startDate.getDate()).slice(-2);

        return `${year}-${month}-${day}`;
    }

    return (
        <form className={style.Ud_form} onSubmit={UserExperienceAction}>

            {experiences.length > 0 &&
                <div className={style.tags} >

                    {experiences?.map((exp, index) =>
                        <div className={style.tag} key={index} >
                            <span onClick={() => settingUpdateVariable(index, exp)}>
                                {exp.companyName}
                            </span>
                            <RxCross1 className={style.crossIcon} onClick={() => removeItems(index, exp)} />
                        </div>)
                    }

                </div>}

            <h4 className={style.formHeading} >Work Experience</h4>


            <div className={style.groupInputGroups}>

                <div className={style.inputGroup}>
                    <label htmlFor="companyName">Company Name (required)</label>
                    <input type="text" id="companyName" name="companyName" value={experienceObj?.companyName} onChange={(e) => inputValueHandler(e)} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="designation">Designation (required)</label>
                    <input type="text" id="designation" name="designation" value={experienceObj?.designation} onChange={(e) => inputValueHandler(e)} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="description">Write about your journey (Optional)</label>
                    <textarea rows={4} id="description" name="description" value={experienceObj?.description} onChange={(e) => inputValueHandler(e)} ></textarea>
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="startDate">Start Date</label>
                    <input type="date" id="startDate" name="startDate" value={experienceObj?.startDate} onChange={(e) => inputValueHandler(e)} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="endDate">End Date</label>
                    <input type="date" id="endDate" name="endDate" value={experienceObj?.endDate} min={returnMinDate(12)} onChange={(e) => inputValueHandler(e)} />
                </div>

                {
                (experienceObj.companyName && experienceObj.designation && update == null ) && 
                <button type='button' onClick={() => addNMoreItems(experienceObj)}>
                    {experiences.length > 0 ? "Add more Experience" : "Add Experience"}
                </button>}

                {
                (experienceObj.companyName && experienceObj.designation && update != null) && 
                <button type='button' onClick={updateArr}>Update Experience</button>}

            </div>

            <button type="submit">
                Save changes
                {loading && <AiOutlineLoading3Quarters className={`loadingIcon loadingLight loadingM`} />}
            </button>
            <Link href={`/profile/${user.userName}`} className={"close-btn"} >Close</Link>
        </form>
    )
}

export default UserExperienceForm