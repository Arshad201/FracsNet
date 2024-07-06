"use client";
import { useState } from "react";
import style from "../ThreadCard.module.css";
import { AiOutlineFullscreen } from "react-icons/ai";
import Link from "next/link";


const Body = ({ data }) => {

    const [readMore, setReadmore] = useState(false);
    const [bigImage, setBigImage] = useState("");

    return (
        <div className={style.postBody}>

            {data.threadText &&
                <p className={style.postText}>

                    {readMore && data.threadText}
                    {!readMore && data.threadText.slice(0, 100)}
                    {(!readMore && data.threadText.length > 100) && "..."}

                </p>}


            {data.threadText?.length > 100 &&
                <span className={style.readMoreBtn}
                    onClick={() => setReadmore(!readMore)}>
                    {readMore ? "Read less" : "Read more"}
                </span>}


            {data.youTubeVideo && <iframe width="100%" height="315" src={`https://www.youtube.com/embed/${data.youTubeVideo}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}


            {data.threadImage?.length > 1 ?
                <div className={style.threadImages} >
                    {data.threadImage?.map(i => <img src={i.url} alt="" onClick={() => setBigImage(i.url)} />)}
                </div>
                :
                <>
                    {data.threadImage.length !== 0 && <img className={style.threadImage} src={data.threadImage[0].url} alt="" />}
                </>
            }

            {
                bigImage !== "" &&
                <div className={style.image_fullscreen} >
                    <div className={style.bigImagebox}>
                        <AiOutlineFullscreen className={style.icon} onClick={() => setBigImage("")} />
                        <img src={bigImage} alt="" />
                    </div>
                    <div className={style.images}>
                        {data.threadImage?.map(i => <img src={i.url} alt="" onClick={() => setBigImage(i.url)} />)}
                    </div>
                </div>
            }


                {data.threadVideo.length!==0 && <video className={style.videoPlayer}  src={data.threadVideo[0].url} controls ></video>}


            {
                data.files?.map((v, index) =>
                    <Link href={v.url} target="_blank" className={style.file} key={index}>
                        { v.url.split("/")[v.url.split("/").length-1]}
                    </Link>)
            }



        </div>
    )
}

export default Body