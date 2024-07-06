"use client";
import { useContext, useEffect, useState } from 'react';
import style from './UserEducationForm.module.css'
import { update_education } from '@/app/server-actions/user/action';
import { StateContext } from '@/app/context/State';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import Link from 'next/link';


const UserEducationForm = ({ user, education }) => {

    const setInitialValue = (key)=>{
        return education ? (education[key] ? education[key] : []) : []
    }

    const { setShowAlert } = useContext(StateContext);

    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState({
        name: "",
        index: null
    });

    const [schoolObj, setSchoolObj] = useState({
        standard: "",
        schoolName: "",
        schoolAddress: "",
        description: "",
        startDate: "",
        endDate: "",
    })
    const [schools, setSchools] = useState(setInitialValue("schools"))

    const [CollegeOrUniversityObj, setCollegeOrUniversityObj] = useState({
        program: "",
        instituteName: "",
        address: "",
        description: "",
        startDate: "",
        endDate: "",
    })
    const [CollegeOrUniversity, setCollegeOrUniversity] =  useState(setInitialValue("CollegeOrUniversity"))

    const validateSchool = () => {
        if (schoolObj?.schoolName.length < 5) {
            setShowAlert({
                type: "error",
                position: "bottom-left",
                message: "School Name must have 5 characters"
            })

            return false
        }

        const isStandardExist = schools.filter((item, index) =>(update.index != index) && item.standard == schoolObj.standard)

        if (isStandardExist.length != 0) {

            setShowAlert({
                type: "error",
                position: "bottom-left",
                message: "This Standard is Already Added"
            })
            return false

        }

        return true
    }
    const validateUniversity = () => {
        if (CollegeOrUniversityObj?.instituteName.length < 5) {
            setShowAlert({
                type: "error",
                position: "bottom-left",
                message: "Institute Name must have 5 characters"
            })

            return false
        }

        if (CollegeOrUniversityObj.program.length < 2) {
            setShowAlert({
                type: "error",
                position: "bottom-left",
                message: "Program must have 3 characters"
            })
            return false
        }

        const isProgramExist = CollegeOrUniversity.filter((item, index) =>(update.index != index) && item.program == CollegeOrUniversityObj.program);

        if (isProgramExist.length != 0) {

            setShowAlert({
                type: "error",
                position: "bottom-left",
                message: "You already added this program"
            })
            return false

        }

        return true
    }
    const addNMoreItems = (obj, setObj, type, setArr) => {

        if (type === "school") {
            const isValid = validateSchool()
            if (!isValid) return
        } else {
            const isValid = validateUniversity()
            if (!isValid) return
        }


        setArr(prev => [...prev, obj])

        if (type === "school") {

            setObj({
                standard: "",
                schoolName: "",
                schoolAddress: "",
                description: "",
                startDate: "",
                endDate: "",
            })

        } else {

            setObj({
                program: "",
                instituteName: "",
                address: "",
                description: "",
                startDate: "",
                endDate: "",
            })

        }
    }

    const settingUpdateVariable = (name, index, obj) => {

        setUpdate({ name, index })

        if (name === "school") {
            setSchoolObj(obj)
            setCollegeOrUniversityObj({
                program: "",
                instituteName: "",
                address: "",
                description: "",
                startDate: "",
                endDate: "",
            })
        } else {
            setCollegeOrUniversityObj(obj)
            setSchoolObj(
                {
                    standard: "",
                    schoolName: "",
                    schoolAddress: "",
                    description: "",
                    startDate: "",
                    endDate: "",
                }
            )


        }
    }

    const updateArr = (obj, setObj, name, setArr) => {

        if (name === "school") {
            const isValid = validateSchool()
            if (!isValid) return
        } else {
            const isValid = validateUniversity()
            if (!isValid) return
        }

        setArr(prev => prev.map((value, index) => {
            if (index === update.index) {
                value = obj
                return value
            }

            return value
        }))

        if (name === "school") {

            setObj({
                standard: "",
                schoolName: "",
                schoolAddress: "",
                description: "",
                startDate: "",
                endDate: "",
            })

        } else {

            setObj({
                program: "",
                instituteName: "",
                address: "",
                description: "",
                startDate: "",
                endDate: "",
            })

        }

        setUpdate({
            name: "",
            index: null
        })
    }

    const removeItems = (index, name, obj) => {

        if (name === "school") {

            if (obj.schoolName === schoolObj.schoolName) {

                setUpdate({
                    name: "",
                    index: null
                })

            }
            setSchools(prev => prev.filter((_, i) => i != index))
        } else {

            if (obj.instituteName === CollegeOrUniversityObj.instituteName) {

                setUpdate({
                    name: "",
                    index: null
                })

            }

            setCollegeOrUniversity(prev => prev.filter((_, i) => i != index))
        }

    }

    const inputValueHandler = (e, setObj) => {
        setObj(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const UserEducationAction = async (e) => {

        e.preventDefault();

        setLoading(true)

        try {

            const res = await update_education({schools, CollegeOrUniversity});

            if (res.message) {
                setShowAlert({
                    type: "success",
                    position: "bottom-left",
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

            setShowAlert({
                type: "error",
                position: "bottom-left",
                message: error.message
            })

        }

    }

    const returnMinDate = (monthsToAdd, obj) => {

        let startDate = new Date(obj?.startDate)
        startDate.setMonth(startDate.getMonth() + monthsToAdd)

        let year = startDate.getFullYear();
        let month = ('0' + (startDate.getMonth() + 1)).slice(-2);
        let day = ('0' + startDate.getDate()).slice(-2);

        return `${year}-${month}-${day}`;
    }

    return (
        <form className={style.Ud_form} onSubmit={UserEducationAction}>


            {schools.length > 0 &&
                <div className={style.tags} >

                    {schools?.map((school, index) =>
                        <div className={style.tag} key={index} >
                            <span onClick={() => settingUpdateVariable("school", index, school)}>
                                {school.standard}
                            </span>
                            <RxCross1 className={style.crossIcon} onClick={() => removeItems(index, "school", school)} />
                        </div>)
                    }

                </div>}

            <h4 className={style.formHeading} >Add School</h4>


            <div className={style.groupInputGroups}>

                
                <div className={style.inputGroup}>
                    <label htmlFor="schoolName">School Name (required)</label>
                    <input type="text" id="schoolName" name="schoolName" value={schoolObj?.schoolName} onChange={(e) => inputValueHandler(e, setSchoolObj)} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="standard">Standard (required)</label>
                    <select name="standard" id="srtandard" value={schoolObj?.standard} onChange={(e) => inputValueHandler(e, setSchoolObj)} >
                        <option value=""> --- Select Standard --</option>
                        <option value="9th Standard">9th Standard</option>
                        <option value="10th Standard">10th Standard</option>
                        <option value="11th Standard">11th Standard</option>
                        <option value="12th Standard">12th Standard</option>
                    </select>
                    {/* <input type="text" id="standard" name="standard" value={schoolObj?.standard} onChange={(e) => inputValueHandler(e, setSchoolObj)} /> */}
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="schoolAddress">School Address</label>
                    <input type="text" id="schoolAddress" name="schoolAddress" value={schoolObj?.schoolAddress} onChange={(e) => inputValueHandler(e, setSchoolObj)} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="description">Write about your journey (Optional)</label>
                    <textarea rows={4} id="description" name="description" value={schoolObj?.description} onChange={(e) => inputValueHandler(e, setSchoolObj)} ></textarea>
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="startDate">Start Date</label>
                    <input type="date"
                        id="startDate"
                        name="startDate"
                        value={schoolObj?.startDate}
                        onChange={(e) => inputValueHandler(e, setSchoolObj)} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="endDate">End Date</label>
                    <input type="date" id="endDate" name="endDate" min={returnMinDate(12, schoolObj)} value={schoolObj?.endDate} disabled={!schoolObj?.startDate && true} onChange={(e) => inputValueHandler(e, setSchoolObj)} />
                </div>

                {(schoolObj.schoolName && schoolObj.standard && update.name != "school") && <button type='button' onClick={() => addNMoreItems(schoolObj, setSchoolObj, "school", setSchools)}>
                    {schools.length > 0 ? "Add more school" : "Add School"}
                </button>}

                {(schoolObj.schoolName && schoolObj.standard && update.name == "school") && <button type='button' onClick={() => updateArr(schoolObj, setSchoolObj, "school", setSchools)}>Update school</button>}


            </div>

            <hr className={style.formLine} />


            {CollegeOrUniversity.length > 0 &&
                <div className={style.tags} >

                    {CollegeOrUniversity?.map((institute, index) =>
                        <div className={style.tag} key={index} >
                            <span onClick={() => settingUpdateVariable("college", index, institute)}>
                                {institute.instituteName}
                            </span>
                            <RxCross1 className={style.crossIcon} onClick={() => removeItems(index, "college", institute)} />
                        </div>)
                    }
                </div>}

            <h4 className={style.formHeading} >Add College or University</h4>

            <div className={style.groupInputGroups}>

                <div className={style.inputGroup}>
                    <label htmlFor="program">Program (required)</label>
                    <input type="text" id="program" name="program" value={CollegeOrUniversityObj?.program} onChange={(e) => inputValueHandler(e, setCollegeOrUniversityObj)} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="instituteName">College or University Name (required)</label>
                    <input type="text" id="instituteName" name="instituteName" value={CollegeOrUniversityObj?.instituteName} onChange={(e) => inputValueHandler(e, setCollegeOrUniversityObj)} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="address">Address of institution</label>
                    <input type="text" id="address" name="address" value={CollegeOrUniversityObj?.address} onChange={(e) => inputValueHandler(e, setCollegeOrUniversityObj)} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="descriptionC">Write about your journey (Optional)</label>
                    <textarea rows={4} id="descriptionC" name="description" value={CollegeOrUniversityObj?.description} onChange={(e) => inputValueHandler(e, setCollegeOrUniversityObj)} ></textarea>
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="startDateC">Start Date</label>
                    <input type="date" id="startDateC" name="startDate" value={CollegeOrUniversityObj?.startDate} onChange={(e) => inputValueHandler(e, setCollegeOrUniversityObj)} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="endDateC">End Date</label>
                    <input type="date" id="endDateC" name="endDate" min={returnMinDate(12, CollegeOrUniversityObj)} value={CollegeOrUniversityObj?.endDate} disabled={!CollegeOrUniversityObj?.startDate && true} onChange={(e) => inputValueHandler(e, setCollegeOrUniversityObj)} />
                </div>

                {(CollegeOrUniversityObj.instituteName && CollegeOrUniversityObj.program && update.name != "college") &&
                    <button type='button'
                        onClick={() => addNMoreItems(CollegeOrUniversityObj, setCollegeOrUniversityObj, "college", setCollegeOrUniversity)}>
                        {CollegeOrUniversity.length > 0 ? "Add more Institute" : "Add Institute"}

                    </button>
                }

                {(CollegeOrUniversityObj.instituteName && CollegeOrUniversityObj.program && update.name == "college") &&
                    <button type='button'
                        onClick={() => updateArr(CollegeOrUniversityObj, setCollegeOrUniversityObj, "college", setCollegeOrUniversity)}>
                        Update Institution
                    </button>
                }

            </div>

            <button type="submit">
                Save changes
                {loading && <AiOutlineLoading3Quarters className={`loadingIcon loadingLight loadingM`} />}
            </button>
            <Link href={`/profile/${user.userName}`} className={"close-btn"} >Close</Link>
        </form>
    )
}

export default UserEducationForm