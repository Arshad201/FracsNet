"use client";
import style from "./UploadPromotionalVideo.module.css";
import { useContext, useState } from 'react';
import Dropzone from 'react-dropzone'
import { StateContext } from "@/app/context/State";
import Link from "next/link";
import { upload_promotionalVideo } from "@/app/server-actions/user/action";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const UploadPromotionalVideo = ({ user }) => {

    const { setShowAlert } = useContext(StateContext);

    const setInitialValue = () => {

        const obj = {
            url: "",
            name: ""
        }


        if (user.promotionalVideo?.url) {
            obj.url = user.promotionalVideo.url
            obj.public_id = user.promotionalVideo.public_id
            delete obj.name
        }

        return obj

    }

    const [video, setVideo] = useState(setInitialValue());
    const [loading, setLoading] = useState(false);

    const onDrop = (acceptedFiles) => {

        const extension = acceptedFiles[0].name.split('.').pop().toLowerCase();
        const isFilevalid = "mp4".includes(extension);

        if (isFilevalid) {

            setLoading(true);
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {

                    const video = document.createElement('video');
                    video.src = reader.result;

                    video.onloadedmetadata = () => {
                        if (video.duration > 60) {
                            setShowAlert({
                                type: "error",
                                position: "bottom-left",
                                message: `Video duration should not greater than 60 seconds`
                            })

                            setLoading(false);


                            return;

                        } else {
                            setVideo({
                                name: acceptedFiles[0].name,
                                url: reader.result
                            })

                            setLoading(false);

                        }
                    }

                    video.onerror = () => {
                        setShowAlert({
                            type: "error",
                            position: "bottom-left",
                            message: "Failed to load video metadata"
                        })

                        setLoading(false);

                        return;
                    };

                }
            };

            reader.readAsDataURL(acceptedFiles[0]);

        } else {
            setShowAlert({
                type: "error",
                position: "bottom-left",
                message: "only mp4 file is allowed!"
            })
        }
    }

    const updateTheVideo = async () => {

        setLoading(true)

        try {

            let res = await upload_promotionalVideo(video)

            if (res.message) {

                setShowAlert({
                    type: "success",
                    position: "bottom-left",
                    message: res.message
                })

                setVideo(res.uploadedItem)
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

            setShowAlert({
                type: "error",
                position: "bottom-left",
                message: error.message
            })

        }


    }

    return (
        <div>
            {!video.url ?
                <div className={style.container} >
                    <Link href={`/profile/${user?.userName}`} className={"close-btn"} >Close</Link>
                    <Dropzone onDrop={onDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <div className={style.dropZone} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Click or Drag to Upload Promotional Video</p>
                            </div>
                        )}
                    </Dropzone>

                </div>
                :
                <div className={style.container}>

                    <video src={video.url} className={style.videoPreview} controls ></video>
                    <div className={style.btnContainer}>
                        <button className={style.btn} onClick={() => setVideo({ name: "", url: "" })}>Upload New</button>
                        <button className={style.btn} onClick={updateTheVideo}>
                            Update
                            {loading && <AiOutlineLoading3Quarters className={`loadingIcon loadingLight loadingM`} />}

                        </button>
                        <Link href={`/profile/${user?.userName}`} className={"close-btn"} >Close</Link>
                    </div>

                </div>
            }
        </div>
    )
}

export default UploadPromotionalVideo