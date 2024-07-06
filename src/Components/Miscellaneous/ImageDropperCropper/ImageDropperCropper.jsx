"use client";
import "./cropper_style.css";
import style from "./DropperCropper.module.css";
import { useContext, useState } from 'react';
import Dropzone from 'react-dropzone'
import Cropper from "react-cropper";
import { StateContext } from "@/app/context/State";
import { upload_image } from "@/app/server-actions/resource/resource";
import Link from "next/link";

const ImageDropperCropper = ({ imgType, resource }) => {

    const { setShowAlert } = useContext(StateContext);

    const setInitialValue = () => {

        const obj = {
            url: "",
            name: ""
        }

        if (imgType.includes("profile")) {

            if (resource.profilePic.url) {
                obj.url = resource.profilePic.url
                obj.public_id = resource.profilePic.url
                delete obj.name
            }
        } else {

            if (resource.bgPic.url) {
                obj.url = resource.bgPic.url
                obj.public_id = resource.bgPic.url
                delete obj.name
            }
        }

        return obj

    }

    const [img, setImg] = useState(setInitialValue());

    const [cropper, setCropper] = useState();
    const [loading, setLoading] = useState(false);

    const onDrop = (acceptedFiles) => {

        const extension = acceptedFiles[0].name.split('.').pop().toLowerCase();
        const isFilevalid = "jpg png jpeg".includes(extension);

        if (isFilevalid) {

            setLoading(true);
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImg({
                        name: acceptedFiles[0].name,
                        url: reader.result
                    })
                    setLoading(false);
                }
            };

            reader.readAsDataURL(acceptedFiles[0]);

        } else {
            setShowAlert({
                type: "error",
                position: "bottom-left",
                message: "only jpg, png and jpeg files are allowed!"
            })
        }
    }

    const updateTheImage = async () => {

        setLoading(true)

        let base64String = cropper.getCroppedCanvas().toDataURL();

        const imageObj = {
            name: img.name ? img.name : img.public_id,
            url: base64String
        }

        try {

            const actionObj = { resource_id: resource._id, imageObj }

            if (imgType === "user-cover-img") actionObj.type = "user-cover-img"
            if (imgType === "user-profile-img") actionObj.type = "user-profile-img"
            if (imgType === "group-cover-img") actionObj.type = "group-cover-img"
            if (imgType === "group-profile-img") actionObj.type = "group-profile-img"

            let res = await upload_image(actionObj)

            if (res.message) {

                setShowAlert({
                    type: "success",
                    position: "bottom-left",
                    message: res.message
                })

                setImg(res.uploadedItem)
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
            {loading && <h1>Uploading.....</h1>}
            {img.url === "" ?
                <div className={style.container} >

                    <Link href={imgType.includes("user") ? `/profile/${resource?.userName}` : `/profile/${resource?.userName}`} className={"close-btn"} >Close</Link>

                    <Dropzone onDrop={onDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <div className={style.dropZone} {...getRootProps()}>
                                <input {...getInputProps()} />

                                <p >
                                    {imgType === "user-profile-img" && "Click to Upload or Drop a Profile Image"}
                                    {imgType === "user-cover-img" && "Click to Upload or Drop a Profile cover Image"}
                                </p>
                            </div>
                        )}
                    </Dropzone>


                </div>
                :
                <div className={style.container}>

                    <Cropper
                        style={{ height: '70%', width: "100%", backgroundColor: 'white' }}
                        zoomTo={0}
                        initialAspectRatio={1}
                        aspectRatio={(imgType === "user-cover-img" && 2) || (imgType === "user-profile-img" && 1)}
                        preview=".img-preview"
                        src={img.url}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false}
                        onInitialized={(instance) => {
                            setCropper(instance);
                        }}
                        guides={true}
                    />

                    <div className={style.btnContainer}>
                        <button className={style.btn} onClick={() => setImg({ name: "", url: "" })}>Upload New</button>
                        <button className={style.btn} onClick={updateTheImage}>Update</button>
                        <Link href={imgType.includes("user") ? `/profile/${resource?.userName}` : `/profile/${resource?.userName}`} className={"close-btn"} >Close</Link>
                    </div>
                </div>}
        </div>
    )
}

export default ImageDropperCropper