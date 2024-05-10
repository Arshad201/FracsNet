"use client";
import "./cropper_style.css";
import style from "./DropperCropper.module.css";
import { useState } from 'react';
import Dropzone from 'react-dropzone'
import Cropper from "react-cropper";

const ImageDropperCropper = ({ imgType }) => {

    const [img, setImg] = useState({
        name: "",
        url: ""
    });
    const [cropper, setCropper] = useState();
    const [loading, setLoading] = useState(false);

    const onDrop = (acceptedFiles) => {

        const name = acceptedFiles[0].name;

        if (name.includes("png") || name.includes("jpg")) {

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
            alert("Only .png and .jpg files are allowed to upload!");
        }
    }

    const updateTheImage = () => {
        alert("image updated successfully!");
    }

    return (
        <div>
            {loading && <h1>GGGGGLOADING.....</h1>}
            {img.url === "" ? <div className={style.container} >
                <Dropzone onDrop={onDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <div className={style.dropZone} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p >{img.name !== "" ? img.name : "Drag & drop image here, or click to select image"}</p>
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
                        aspectRatio={(imgType === "groupCoverImage" && 3) || (imgType === "pofile" && 1)}
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
                        <button className={style.btn} onClick={() => setImg({ name: "", url: "" })}>Cancel</button>
                        <button className={style.btn} onClick={updateTheImage}>Update</button>
                    </div>
                </div>}
        </div>
    )
}

export default ImageDropperCropper