"use client"
import { Fragment, useContext, useEffect, useState } from 'react';
import style from './Settings.module.css'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { StateContext } from '@/app/context/State';
import { usePathname } from 'next/navigation';


const Settings = ({ settingOptions, data }) => {

    const { setShowAlert } = useContext(StateContext);
    const [showSettings, setShowSettings] = useState(false);

    const handleClickOutside = (e) => {
        if (e.target.className !== 'settingOption') {
            setShowSettings(false)
        }
    }

    const settingActionHandler = async(action, data) =>{
        
        const actionRes = await action(data)

        if(actionRes?.postLink){
            navigator.clipboard.writeText(actionRes.postLink).then(()=>{
                setShowAlert({
                    type: "success",
                    message: "Link copied to clipboard!"
                })
            })
        }

        if(actionRes?.message){
            setShowAlert({
                type: "success",
                message: actionRes.message
            })
        }

        if(actionRes?.error){
            setShowAlert({
                type: "error",
                message: actionRes.error
            })
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true)
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        }
    }, [])

    return (
        <div className={style.settings}>
            <BsThreeDotsVertical className={style.icons}
                onClick={() => setShowSettings(!showSettings)}
            />
            {/* {showSettings && */}
            <div className={`${style.settingOptions} ${showSettings ? style.SettingIsOn : style.SettingIsOff}`} >
                {settingOptions?.map((s, i) =>


                    <Fragment key={i}>
                    {
                    s.type === "action" &&
                    <span
                        className={style.settingOption}
                        onClick={() => settingActionHandler(s.action, data)}>
                        {s.text}
                    </span>
                    }

                    {s.type === "link" && <Link className={style.settingOption}  href={s.link} target='_blank'>{s.text}</Link>}
                    </Fragment>


                )
                }
            </div>
            {/* } */}
        </div>
    )
}

export default Settings