"use client";
import { useState } from 'react';
import style from './UserEducationForm.module.css';

const UserEducationForm = () => {

    const [showSchoolForm, setShowSchoolForm] = useState(true);
    const [InterForm, setInterForm] = useState(false);
    const [BachelorForm, setBachelorForm] = useState(false);
    const [MastersForm, setMastersForm] = useState(false);


    const handleShowForm = (formName) =>{

        if(formName === "sch"){
            setShowSchoolForm(true);
            setInterForm(false);
            setBachelorForm(false);
            setMastersForm(false);
        }

        if(formName === "int"){
            setShowSchoolForm(false);
            setInterForm(true);
            setBachelorForm(false);
            setMastersForm(false);
        }

        if(formName === "bach"){
            setShowSchoolForm(false);
            setInterForm(false);
            setBachelorForm(true);
            setMastersForm(false);
        }

        if(formName === "mast"){
            setShowSchoolForm(false);
            setInterForm(false);
            setBachelorForm(false);
            setMastersForm(true);
        }
    }

    return (
        <>
            <div className={style.formOptions}>
                <button className={`${style.btn} ${showSchoolForm && style.activeBtn}`} onClick={()=>handleShowForm("sch")}>Add a High School</button>
                <button className={`${style.btn} ${InterForm && style.activeBtn}`}  onClick={()=>handleShowForm("int")}>Add an Intermediate</button>
                <button className={`${style.btn} ${BachelorForm && style.activeBtn}`}  onClick={()=>handleShowForm("bach")}>Add Graduation</button>
                <button className={`${style.btn} ${MastersForm && style.activeBtn}`}  onClick={()=>handleShowForm("mast")}>Add Masters</button>
            </div>
            {/* School Form */}
            {showSchoolForm && <form className={style.UE_form}>

                <div className={style.inputGroup}>
                    <label htmlFor="schoolName">Name of the School where you completed your High School</label>
                    <input type="text" id="schoolName" name="schoolName" required />
                </div>

                <div className={style.groupInputGroups}>
                    <div className={style.inputGroup}>
                        <label htmlFor="firstName">Start Date</label>
                        <input type="date" id="firstName" name="firstName" required />
                    </div>
                    <div className={style.inputGroup}>
                        <label htmlFor="lastName">End Date</label>
                        <input type="date" id="lastName" name="lastName" required />
                    </div>
                </div>

                <div className={style.inputGroup}>
                    <label htmlFor="highSchoolDescription">Describe How's your journey (Optional)</label>
                    <textarea rows={3} id="highSchoolDescription" name="highSchoolDescription" required></textarea>
                </div>
                <button className={style.btn} type="submit">Save changes</button>
            </form>}

            {/* Inter Form */}
            {InterForm && <form className={style.UE_form}>

                <div className={style.inputGroup}>
                    <label htmlFor="schoolName">Name of the School where you completed your Intermediate education</label>
                    <input type="text" id="schoolName" name="schoolName" required />
                </div>

                <div className={style.groupInputGroups}>
                    <div className={style.inputGroup}>
                        <label htmlFor="firstName">Start Date</label>
                        <input type="date" id="firstName" name="firstName" required />
                    </div>
                    <div className={style.inputGroup}>
                        <label htmlFor="lastName">End Date</label>
                        <input type="date" id="lastName" name="lastName" required />
                    </div>
                </div>

                <div className={style.inputGroup}>
                    <label htmlFor="interDescription">Describe How's your journey (Optional)</label>
                    <textarea rows={3} id="interDescription" name="interDescription" required></textarea>
                </div>
                <button className={style.btn} type="submit">Save changes</button>
            </form>}

            {/* Bachelor Form */}
            {BachelorForm && <form className={style.UE_form}>

                <div className={style.inputGroup}>
                    <label htmlFor="schoolName">Name of the College or University where you completed your Graduation</label>
                    <input type="text" id="graduationCollegeName" name="graduationCollegeName" required />
                </div>

                <div className={style.groupInputGroups}>
                    <div className={style.inputGroup}>
                        <label htmlFor="firstName">Start Date</label>
                        <input type="date" id="firstName" name="firstName" required />
                    </div>
                    <div className={style.inputGroup}>
                        <label htmlFor="lastName">End Date</label>
                        <input type="date" id="lastName" name="lastName" required />
                    </div>
                </div>

                <div className={style.inputGroup}>
                    <label htmlFor="graduationDescription">Describe How's your journey (Optional)</label>
                    <textarea rows={3} id="graduationDescription" name="graduationDescription" required></textarea>
                </div>
                <button className={style.btn} type="submit">Save changes</button>
            </form>}

            {/* Masters Form */}
            {MastersForm && <form className={style.UE_form}>

                <div className={style.inputGroup}>
                    <label htmlFor="mastersCollegeName">Name of the College or University where you completed your Masters</label>
                    <input type="text" id="mastersCollegeName" name="mastersCollegeName" required />
                </div>

                <div className={style.groupInputGroups}>
                    <div className={style.inputGroup}>
                        <label htmlFor="firstName">Start Date</label>
                        <input type="date" id="firstName" name="firstName" required />
                    </div>
                    <div className={style.inputGroup}>
                        <label htmlFor="lastName">End Date</label>
                        <input type="date" id="lastName" name="lastName" required />
                    </div>
                </div>

                <div className={style.inputGroup}>
                    <label htmlFor="graduationDescription">Describe How's your journey (Optional)</label>
                    <textarea rows={3} id="graduationDescription" name="graduationDescription" required></textarea>
                </div>
                <button className={style.btn} type="submit">Save changes</button>
            </form>}
        </>
    )
}

export default UserEducationForm