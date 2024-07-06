"use client";
import style from "./FormForThreadCreation.module.css";
import { MdInsertPhoto, MdOndemandVideo } from "react-icons/md";
import { GoFileDirectoryFill } from "react-icons/go";
import { CgPoll } from "react-icons/cg";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { PiFilmStripFill } from "react-icons/pi";
import { MdFileCopy } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineWorkHistory } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { FaThreads } from "react-icons/fa6";
import { useContext, useState } from "react";
import { useSearchParams } from "next/navigation";
import Dropzone from 'react-dropzone'
import { StateContext } from "@/app/context/State";
import { create_thread, update_thread } from "@/app/server-actions/thread/thread";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const FormForThreadCreation = ({ resourceData }) => {

    const searchParams = useSearchParams();
    const create = searchParams.get('create');
    const update = searchParams.get('update');
    const resource_id = searchParams.get('resource_id');

    const { data: loggedInUser } = useSession();
    const { setShowAlert } = useContext(StateContext);

    const initialValue = (key, defaultV) => {

        if (key === "youTubeVideo") {
            return resourceData[key] ? `https://youtu.be/${resourceData[key]}` : ""
        }
        return resourceData[key] ? resourceData[key] : defaultV
    }

    const [loading, setLoading] = useState(false);
    const [threadText, setThreadText] = useState(initialValue("threadText", ""))
    const [threadImage, setThreadImage] = useState(initialValue("threadImage", []))
    const [threadVideo, setThreadVideo] = useState(initialValue("threadVideo", []))
    const [youTubeVideo, setYouTubeVideo] = useState(initialValue("youTubeVideo", ""))
    const [files, setFiles] = useState(initialValue("files", []))


    const fileUploader = (uploaderType, acceptedFiles, allowedFiles, setArr) => {

        let isAlertInvoked = false;

        let filteredItems = acceptedFiles.filter((i, index) => {

            const extension = i.name.split('.').pop().toLowerCase();
            const isFileInvalid = allowedFiles.includes(extension);

            const sizeInBM = i.size / (1024 * 1024)
            // console.log(sizeInBM.toFixed(2));

            if (sizeInBM > 20) {
                setShowAlert({
                    type: "error",
                    message: `Please Upload file under 20 MB`
                })

                return;
            }


            if (!isFileInvalid) {
                if (!isAlertInvoked) {
                    setShowAlert({
                        type: "error",
                        message: `Only ${allowedFiles} files are allowed to upload`
                    })
                }
                isAlertInvoked = true
            }

            return isFileInvalid === true

        });


        if (uploaderType === "threadImages") {


            const totalItems = threadImage.length + filteredItems.length

            if (totalItems > 5) {
                setShowAlert({
                    type: "error",
                    message: "You can upload only 5 images for thread"
                })
            }


            const limitLeft = 5 - threadImage.length

            filteredItems = filteredItems.slice(0, limitLeft);

        }

        if (uploaderType === "threadVideos") {


            const totalItems = threadVideo.length + filteredItems.length

            if (totalItems > 1) {
                setShowAlert({
                    type: "error",
                    message: "You can upload only 1 video"
                })
            }


            const limitLeft = 1 - threadVideo.length

            filteredItems = filteredItems.slice(0, limitLeft);

        }

        if (uploaderType === "files") {


            const totalItems = files.length + filteredItems.length

            if (totalItems > 3) {
                setShowAlert({
                    type: "error",
                    message: "You can upload only 3 files"
                })
            }


            const limitLeft = 3 - files.length

            filteredItems = filteredItems.slice(0, limitLeft);

        }

        if (filteredItems.length !== 0) {


            filteredItems.forEach(item => {

                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {

                        if (item.name.includes("mp4")) {

                            const video = document.createElement('video');
                            video.src = reader.result;

                            video.onloadedmetadata = () => {
                                if (video.duration > 60) {
                                    setShowAlert({
                                        type: "error",
                                        message: `Video duration should not greater than 5 seconds`
                                    })

                                    return;

                                } else {
                                    setArr(prev => [...prev, { name: item.name, url: reader.result }])
                                }
                            }

                            video.onerror = () => {
                                setShowAlert({
                                    type: "error",
                                    message: "Failed to load video metadata"
                                })

                                return;
                            };


                        } else {
                            setArr(prev => [...prev, { name: item.name, url: reader.result }])
                        }


                    }
                };

                reader.readAsDataURL(item);

            });
        }
    }

    const onDrop = (name, acceptedFiles) => {

        if (name === "threadImage") {
            fileUploader("threadImages", acceptedFiles, 'jpg, png and jpeg', setThreadImage)
        }

        if (name === "threadVideo") {
            fileUploader("threadVideos", acceptedFiles, 'mp4', setThreadVideo)
        }

        if (name === "files") {
            fileUploader("files", acceptedFiles, 'text, jpg, png, jpeg, pdf and html', setFiles)
        }

    }

    const removeItems = (index, setArr) => {
        setArr(prev => prev.filter((_, i) => i != index));
    }

    const validateAllFields = () => {

        // Show Error If All the fields are empty
        if (!threadText &&
            threadImage.length == 0 &&
            threadVideo.length == 0 &&
            !youTubeVideo) {
            setShowAlert({
                type: "error",
                message: "Atleast write a thread text!"
            })

            return false;
        }

        if (youTubeVideo) {

            // validate YouTube video code
            const extractVideoID = (url) => {
                const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?v=)|(watch\?.+&v=))([^#&?]*).*/;
                const match = url.match(regExp);
                return (match && match[8].length === 11) ? match[8] : null;
            };

            const videoId = extractVideoID(youTubeVideo);

            if (!videoId) {
                setShowAlert({
                    type: "error",
                    message: "Invalid YouTube Video!"
                })

                return false
            }

            return videoId

        }
    }

    // Creating or Updating Thread
    const ThreadActionHandler = async (e) => {

        setLoading(true)
        e.preventDefault();

        const youTubeVideoId = validateAllFields();

        if (youTubeVideoId === false) {
            setLoading(false);
            return
        }

        const threadData = {
            threadText,
            threadImage,
            threadVideo,
            youTubeVideoId,
            files
        }

        try {

            let res;
            let message;

            if (update && resource_id) {
                threadData.threadId = resource_id
                res = await update_thread(threadData);
                if (res.thread) {
                    message = "Thread Updated Successfully!"
                } else {
                    message = "Failed to update thread, Try again!"
                }

            } 
            if(create){

                res = await create_thread(threadData);
                if (res.thread) {
                    message = "Thread Created Successfully!"
                } else {
                    message = "Failed to create thread, Try again!"
                }

            }

            console.log(res);
            // setThreadText("")
            // setYouTubeVideo("")
            // setThreadImage([])
            // setThreadVideo([])
            // setFiles([])

            if (res.thread) {
                setShowAlert({
                    type: "success",
                    message
                })
            } else {
                setShowAlert({
                    type: "error",
                    message
                })
            }
            setLoading(false)

        } catch (error) {
            setShowAlert({
                type: "error",
                message: error.message
            })
            setLoading(false)

        }
    }

    const returnFileName = (obj) => {
        return obj.name ? obj.name : obj.url.split("/")[obj.url.split("/").length - 1]
    }

    return (
        <>
            <div className={style.FormForThreadCreation}>
                <h1 className="sectionHeading">{
                    resourceData.error ? "Create Thread" : "Update Thread"
                }</h1>
                <div className={style.threadCreation}>
                    <div className={style.header}>
                        <div className={style.uploadedItems} >

                            {
                                threadImage?.map((v, index) =>
                                    <div className={style.image} key={index}>
                                        <img src={v.url} alt="" />
                                        <RxCross1 className={style.crossIcon} onClick={() => removeItems(index, setThreadImage)} />
                                    </div>)
                            }


                            {
                                threadVideo?.map((v, index) =>
                                    <div className={style.video} key={index}>
                                        <span className={style.fileName} >
                                            {returnFileName(v)}
                                        </span>
                                        <PiFilmStripFill className={style.icon} />
                                        <RxCross1 className={style.crossIcon} onClick={() => removeItems(index, setThreadVideo)} />
                                    </div>)
                            }

                            {

                                files?.map((v, index) =>
                                    <div className={style.file} key={index}>
                                        <span className={style.fileName} >
                                            {returnFileName(v)}
                                        </span>
                                        <MdFileCopy className={style.icon} />
                                        <RxCross1 className={style.crossIcon} onClick={() => removeItems(index, setFiles)} />
                                    </div>)
                            }
                        </div>
                        <div className={style.userProfile}>
                            <Link href={`/profile/${loggedInUser?.userName}`} className={style.profileImgWrapper}>
                                <img src="/profile.jpg" alt="" />
                            </Link>
                            <div className={style.metaData}>
                                <span className={style.userName}>John Doe</span>
                            </div>
                        </div>
                    </div>
                    <form className={style.form} onSubmit={ThreadActionHandler}>
                        <div className={style.formFeatures}>
                            {(threadVideo.length === 0 && !youTubeVideo) &&
                                <Dropzone onDrop={(e) => onDrop('threadImage', e)}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div className={style.options} {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <MdInsertPhoto className={style.icons} />
                                            <span >Add photo</span>
                                        </div>
                                    )}
                                </Dropzone>}
                            {(threadImage.length === 0 && !youTubeVideo) &&
                                <Dropzone onDrop={(e) => onDrop('threadVideo', e)}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div className={style.options} {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <MdOndemandVideo className={style.icons} />
                                            <span >Add Video</span>
                                        </div>
                                    )}
                                </Dropzone>}
                            <Dropzone onDrop={(e) => onDrop('files', e)}>
                                {({ getRootProps, getInputProps }) => (
                                    <div className={style.options} {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <GoFileDirectoryFill className={style.icons} />
                                        <span >Add Files</span>
                                    </div>
                                )}
                            </Dropzone>
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
                            <textarea
                                className={style.threadTextInput}
                                placeholder="Write a thread..."
                                name="threadText"
                                value={threadText}
                                onChange={(e) => setThreadText(e.target.value)}>
                            </textarea>
                            {
                                (
                                    threadImage.length == 0
                                    &&
                                    threadVideo.length == 0
                                ) &&

                                <input
                                    type="text"
                                    className={style.ytInput}
                                    placeholder="Enter a youtube video link"
                                    name="youTubeVideo"
                                    value={youTubeVideo}
                                    onChange={(e) => setYouTubeVideo(e.target.value)} />
                            }
                            <button>
                                {
                                    resourceData.error ? "Post" : "Update"
                                }
                                {loading &&
                                    <AiOutlineLoading3Quarters className={`loadingIcon loadingLight loadingM`} />}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FormForThreadCreation