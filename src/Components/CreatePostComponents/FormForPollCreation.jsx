"use client";
import style from "./FormForPollCreation.module.css";
import { CgPoll } from "react-icons/cg";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaThreads } from "react-icons/fa6";
import { MdOutlineWorkHistory } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { StateContext } from "@/app/context/State";
import { create_poll, update_poll } from "@/app/server-actions/poll/poll";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const FormForPollCreation = ({ resourceData }) => {

    const { setShowAlert } = useContext(StateContext);
    const { data: loggedInUser } = useSession();
    const searchParams = useSearchParams();
    const create = searchParams.get('create');
    const update = searchParams.get('update');
    const resource_id = searchParams.get('resource_id');
    const [loading, setLoading] = useState(false);

    const initialValue = (key) => {

        if (key === "question") {
            return resourceData[key] ? resourceData[key] : ""
        }

        
        return resourceData[key] ? resourceData[key].optionText : ""
    }

    const [formData, setFormData] = useState(
        {
            question: initialValue("question"),
            option_1: initialValue("option_1"),
            option_2: initialValue("option_2"),
            option_3: initialValue("option_3"),
            option_4: initialValue("option_4"),
            option_5: initialValue("option_5"),
        })

    const inputValueHandler = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const pollActionHandler = async (e) => {

        e.preventDefault();
        setLoading(true)

        if (!formData.question || !formData.option_1 || !formData.option_2) {
            setShowAlert({
                type: "error",
                message: "Enter required field!"
            })
            setLoading(false)
        }

        try {

            let res;
            if (update && resource_id) {

                res = await update_poll(formData, resourceData._id);

                if (res.message) {
                    setShowAlert({ type: "success", message: res.message })
                } else {
                    setShowAlert({ type: "error", message: "Unable to Update poll" })
                }

                setLoading(false)
                return;
            }

            if (create) {

                res = await create_poll(formData);

                if (res.message) {
                    setShowAlert({ type: "success", message: res.message })

                } else {
                    setShowAlert({ type: "error", message: "Unable to Create poll" })
                }

                setLoading(false)
                return;

            }


        } catch (error) {
            setShowAlert({
                type: "error",
                message: error.message
            })
            setLoading(false)

        }

    }

    return (

        <div className={style.FormForThreadCreation}>
            <h1 className="sectionHeading">Start a poll!</h1>
            <p className={style.subHeading} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Non modi laborum consequuntur minima explicabo dolorem quae numquam officia et optio, enim soluta deleniti quo nihil!</p>
            <div className={style.threadCreation}>
                <div className={style.header}>
                    <div className={style.userProfile}>
                        <Link href={`/profile/${loggedInUser?.userName}`} className={style.profileImgWrapper}>
                            <img src="/profile.jpg" alt="" />
                        </Link>
                        <div className={style.metaData}>
                            <span className={style.userName}>John Doe</span>
                        </div>
                    </div>

                </div>
                <form action="" className={style.form} onSubmit={pollActionHandler}>
                    <div className={style.formFeatures}>
                        <Link href={`/create?create=thread`} className={`${style.options} ${create === "thread" && style.activeOption} `}>
                            <FaThreads className={style.icons} />
                            <span>Create a Thread</span>
                        </Link>
                        <Link href={`/create?create=poll`} className={`${style.options} ${create === "poll" && style.activeOption} `}>
                            <CgPoll className={style.icons} />
                            <span>Start a poll</span>
                        </Link>
                        <Link href={`/create?create=job`} className={`${style.options} ${create === "job" && style.activeOption} `}>
                            <MdOutlineWorkHistory className={style.icons} />
                            <span>Post a job</span>
                        </Link>
                        <Link href={`/create?create=blogpost`} className={`${style.options} ${create === "blogpost" && style.activeOption} `}>
                            <CgWebsite className={style.icons} />
                            <span>Publish a blogpost</span>
                        </Link>
                    </div>
                    <div className={style.formRightCol} >
                        <textarea placeholder="Write a question...(required)" name="question" value={formData.question} onChange={(e) => inputValueHandler(e)} ></textarea>
                        <input type="text" placeholder="Write an option 1 (required)" name="option_1" value={formData.option_1} onChange={(e) => inputValueHandler(e)} />
                        <input type="text" placeholder="Write an option 2 (required)" name="option_2" value={formData.option_2} onChange={(e) => inputValueHandler(e)} />
                        <input type="text" placeholder="Write an option 3 (Optional)" name="option_3" value={formData.option_3} onChange={(e) => inputValueHandler(e)} />
                        <input type="text" placeholder="Write an option 4 (Optional)" name="option_4" value={formData.option_4} onChange={(e) => inputValueHandler(e)} />
                        <input type="text" placeholder="Write an option 5 (Optional)" name="option_5" value={formData.option_5} onChange={(e) => inputValueHandler(e)} />
                        <button>
                            {
                                resourceData.error ? "Create poll" : "Update poll"
                            }
                            {loading &&
                                <AiOutlineLoading3Quarters className={`loadingIcon loadingLight loadingM`} />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormForPollCreation