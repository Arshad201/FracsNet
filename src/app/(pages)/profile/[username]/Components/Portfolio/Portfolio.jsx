import Link from "next/link";
import style from "./Portfolio.module.css";
import { GetSession } from "@/lib/utils/getSessionData";
import { GoFileDirectoryFill } from "react-icons/go";
import { GrDocumentPdf } from "react-icons/gr";
import { TbFileTypeXls } from "react-icons/tb";
import { PiFileDocFill } from "react-icons/pi";
import { TbFileTypeDocx } from "react-icons/tb";
import { LuFileVideo } from "react-icons/lu";

const Portfolio = async ({ user, projects }) => {

    const loggedInUser = await GetSession();

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

    return (
        <div className={style.projects} >

            {loggedInUser?._id == user?._id &&
                <Link href={`/profile/${user?.userName}?update=project`} className={style.btn} >

                    {
                        !projects ? "Create Portfolio" : projects.length == 0 ? "Create Portfolio" : "Update Portfolio"
                    }

                </Link>}

            {projects?.map((project)=><div className={style.project} >
                <span className={style.badge} >Project</span>
                <span className={style.title}>{project.title} </span>
                <p className={style.desc}>{project.description}</p>

                <div className={style.previewFiles} >
                    {project.files?.map((file, index) =>
                        <Link href={file.url} target="_blank" className={style.file} key={index} >

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

                        </Link>)
                    }
                </div>
                {project.link && <Link href={project.link} className={style.btn} >View Project</Link>}
            </div>)}

        </div>
    )
}

export default Portfolio