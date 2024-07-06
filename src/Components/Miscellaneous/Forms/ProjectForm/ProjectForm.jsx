"use client";
import { useContext, useState } from 'react';
import style from './ProjectForm.module.css'
import { StateContext } from '@/app/context/State';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import Dropzone from 'react-dropzone'
import { GoFileDirectoryFill } from "react-icons/go";
import { GrDocumentPdf } from "react-icons/gr";
import { TbFileTypeXls } from "react-icons/tb";
import { PiFileDocFill } from "react-icons/pi";
import { TbFileTypeDocx } from "react-icons/tb";
import { LuFileVideo } from "react-icons/lu";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { create_project, update_project } from '@/app/server-actions/user/action';


const ProjectForm = ({ user, projects }) => {

    const searchParams = useSearchParams();
    const projectId = searchParams.get('projectId');
    const { setShowAlert } = useContext(StateContext);

    const setInitialValue = (key) => {


        const project = projects?.find(value => value._id == projectId)
        if (key === "files") {
            return project ? project[key] : []
        }

        return project ? (project[key] ? project[key] : "") : ""

    }

    const [loading, setLoading] = useState(false);

    const [files, setFiles] = useState(setInitialValue("files"))

    const [ProjectObj, setProjectObj] = useState({
        title: setInitialValue("title"),
        description: setInitialValue("description"),
        link: setInitialValue("link"),
    })

    const validateFields = () => {
        if (!ProjectObj.title) {
            setShowAlert({
                type: "error",
                position: "bottom-left",
                message: "Project title is required!"
            })

            return false
        }

        if (files.length == 0) {
            setShowAlert({
                type: "error",
                position: "bottom-left",
                message: "Atleast one file is necessary to upload!!"
            })

            return false
        }

        if (ProjectObj.title.length < 5) {
            setShowAlert({
                type: "error",
                position: "bottom-left",
                message: "Project title must have 5 characters!"
            })

            return false
        }

        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/@?\w .-]*)*\/?(\?.*)?(#.*)?$/;

        if (ProjectObj.link && !urlPattern.test(ProjectObj.link)) {
            setShowAlert({
                type: "warning",
                position: "bottom-left",
                message: "Enter a valid link!"
            })

            return;
        }

        return true
    }

    const removeFile = (index) => {

        setFiles(prev => prev.filter((_, i) => i != index))

    }

    const inputValueHandler = (e) => {

        setProjectObj(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const UserProjectAction = async (e) => {

        e.preventDefault();
        if (loading) return

        const isValid = validateFields()
        if (!isValid) return;

        setLoading(true)

        try {

            const projectData = { files, ...ProjectObj }

            let res;

            if (projectId) {
                res = await update_project(projectId, projectData);
            } else {
                res = await create_project(projectData);
            }

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
        }

    }

    const getExt = (file) => {
        const arr = file.split(".");
        return arr[arr.length - 1]
    }

    const getFileName = (file) => {
        let fileName = file.name ? file.name : file.url
        fileName = fileName.split("/");
        fileName = fileName[fileName.length - 1]
        return fileName

    }

    const onDrop = (acceptedFiles) => {

        const allowedFiles = 'jpg, png, jpeg, pdf, xls, xlsx, doc, docs, mp4'


        let isAlertInvoked = false;

        let filteredItems = acceptedFiles.filter((i, index) => {

            const extension = i.name.split('.').pop().toLowerCase();
            const isFileInvalid = allowedFiles.includes(extension);

            const sizeInBM = i.size / (1024 * 1024)

            if (sizeInBM > 20) {
                setShowAlert({
                    type: "error",
                    position: "bottom-left",
                    message: `Please Upload file under 20 MB`
                })

                return;
            }


            if (!isFileInvalid) {
                if (!isAlertInvoked) {
                    setShowAlert({
                        type: "error",
                        position: "bottom-left",
                        message: `Only ${allowedFiles} files are allowed to upload`
                    })
                }
                isAlertInvoked = true
            }

            return isFileInvalid === true

        });


        const totalItems = files.length + filteredItems.length

        if (totalItems > 5) {
            setShowAlert({
                type: "error",
                position: "bottom-left",
                message: "You can upload only 5 files"
            })
        }


        const limitLeft = 5 - files.length

        filteredItems = filteredItems.slice(0, limitLeft);


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
                                        position: "bottom-left",
                                        message: `Video duration should not greater than 5 seconds`
                                    })

                                    return;

                                } else {
                                    setFiles(prev => [...prev, { name: item.name, url: reader.result }])
                                }
                            }

                            video.onerror = () => {
                                setShowAlert({
                                    type: "error",
                                    position: "bottom-left",
                                    message: "Failed to load video metadata"
                                })

                                return;
                            };


                        } else {
                            setFiles(prev => [...prev, { name: item.name, url: reader.result }])
                        }


                    }
                };

                reader.readAsDataURL(item);

            });
        }
    }

    return (
        <form className={style.Ud_form} onSubmit={UserProjectAction}>

            <h4 className={style.formHeading} >{projectId ? "Update Project" : "Add Project"}</h4>

            <div className={style.previewFiles} >
                {/* {files.join} */}
                {files?.map((file, index) =>
                    <div className={style.file} key={index} >

                        {
                            ["jpg", 'jpeg', 'png'].includes(getExt(getFileName(file))) && <img src={file.url} alt="" />
                        }

                        {
                            ["pdf"].includes(getExt(getFileName(file)))
                            && <div className={style.fileName} >
                                <GrDocumentPdf className={style.fileIcon} />
                                {getFileName(file)}
                            </div>
                        }

                        {
                            ["xls", "xlsx"].includes(getExt(getFileName(file)))
                            && <div className={style.fileName} >
                                <TbFileTypeXls className={style.fileIcon} />
                                {getFileName(file)}
                            </div>
                        }

                        {
                            ["doc"].includes(getExt(getFileName(file)))
                            && <div className={style.fileName} >
                                <PiFileDocFill className={style.fileIcon} />
                                {getFileName(file)}
                            </div>
                        }

                        {
                            ["docx"].includes(getExt(getFileName(file)))
                            && <div className={style.fileName} >
                                <TbFileTypeDocx className={style.fileIcon} />
                                {getFileName(file)}
                            </div>
                        }


                        {
                            ["mp4"].includes(getExt(getFileName(file)))
                            && <div className={style.fileName} >
                                <LuFileVideo className={style.fileIcon} />
                                {getFileName(file)}
                            </div>
                        }

                        <RxCross1 className={style.crossIcon} onClick={() => removeFile(index)} />
                    </div>)
                }

            </div>

            <div className={style.groupInputGroups}>

                <Dropzone onDrop={(e) => onDrop(e)}>
                    {({ getRootProps, getInputProps }) => (
                        <div className={style.dropzone} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <GoFileDirectoryFill className={style.icon} />
                            <span >Upload File</span>
                        </div>
                    )}
                </Dropzone>

                <div className={style.inputGroup}>
                    <label htmlFor="title">Project Title</label>
                    <input type="text" id="title" name="title" value={ProjectObj.title} onChange={(e) => inputValueHandler(e)} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="description">Project Description</label>
                    <textarea rows={4} id="description" name="description" value={ProjectObj.description} onChange={(e) => inputValueHandler(e)} ></textarea>
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="link">Project Link</label>
                    <input type="text" id="link" name="link" value={ProjectObj.link} onChange={(e) => inputValueHandler(e)} />
                </div>

            </div>

            <button type="submit">
                {projectId ? "Update Project" : "Create Project"}
                {loading && <AiOutlineLoading3Quarters className={`loadingIcon loadingLight loadingM`} />}
            </button>
            <Link href={`/profile/${user.userName}`} className={"close-btn"} >Close</Link>
        </form>
    )
}

export default ProjectForm