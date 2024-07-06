"use client"
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import style from "./FormForBlogPostCreation.module.css";
import dynamic from "next/dynamic";
import { MdInsertPhoto, MdOndemandVideo, MdOutlineContentCopy } from "react-icons/md";
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
import { useSearchParams } from "next/navigation";
import { StateContext } from "@/app/context/State";
import Dropzone from 'react-dropzone'
import { create_blogpost, update_blogpost } from "@/app/server-actions/blogpost/action";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const FormForBlogPostCreation = ({ resourceData }) => {

  const { setShowAlert } = useContext(StateContext);
  const { data: loggedInUser } = useSession();
  const searchParams = useSearchParams();
  const create = searchParams.get('create');
  const update = searchParams.get('update');
  const resource_id = searchParams.get('resource_id');
  const editor = useRef(null);


  const initialValue = (key) => {

    let defaultV = "";

    if (key === 'category') defaultV = "general"

    if (key === 'featuredImage') {
      return resourceData[key] ? [resourceData[key]] : []
    }

    if (
      [
        "images",
        "files",
        "tags",
      ]
        .includes(key)) defaultV = []

    return resourceData[key] ? resourceData[key] : defaultV

  }

  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState(initialValue("title"))
  const [description, setDescription] = useState(initialValue("metaDescription"))
  const [category, setCategory] = useState(initialValue("category"))
  const [content, setContent] = useState(initialValue("content"))
  const [tags, setTags] = useState(initialValue("tags"))
  const [featuredImage, setFeaturedImage] = useState(initialValue("featuredImage"))
  const [images, setImages] = useState(initialValue("images"))
  const [tag, setTag] = useState("");

  const addTagHandler = () => {

    if (!tag) {
      setShowAlert({
        type: "error",
        message: "write down the tag first"
      })
      return
    }

    const splitTag = tag.split(" ");

    const updatedFilteredTag = splitTag.filter(i=>{
      i.trim();
      return i!==""
    })

    setTags(prev => prev ? [...prev, ...updatedFilteredTag] : [...updatedFilteredTag])
    setTag("")
  }

  const validateFormFields = () => {

    if (!title) {
      setShowAlert({
        type: 'error',
        message: "Title is required!"
      })

      return false
    }

    if (!description) {
      setShowAlert({
        type: 'error',
        message: "Description is required!"
      })

      return false
    }


    if (featuredImage.length === 0) {
      setShowAlert({
        type: 'error',
        message: "Featured Image is required!"
      })

      return false
    }

    if (!content) {
      setShowAlert({
        type: 'error',
        message: "Content is required!"
      })
      return false
    }


    if (content.length < 200) {
      setShowAlert({
        type: 'error',
        message: "Content should have minimum 200 characters!"
      })
      return false
    }


    if (tags.length < 2) {
      setShowAlert({
        type: 'error',
        message: "Atleast add 2 Tags!"
      })
      return false
    }

    return true

  }

  const blogpostActionHandler = async (e) => {
    e.preventDefault();

    const isValid = validateFormFields();

    if (!isValid) {
      return false;
    }

    const blogpostObj = {
      title,
      description,
      content,
      category,
      tags,
      featuredImage,
      images,
    }

    try {

      setLoading(true)
      let res;
      let message;

      if (create) {

        res = await create_blogpost(blogpostObj);

      }

      if (update && resourceData) {

        blogpostObj.blogPostId = resourceData._id
        res = await update_blogpost(blogpostObj);

      }


      if (res.message) {
        setShowAlert({
          type: "success",
          message: res.message
        })
      }

      if (res.error) {
        setShowAlert({
          type: "error",
          message: res.error
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

  const config = useMemo(() => (
    {
      placeholder: "Start writing main content of your blogpost...",
      statusbar: false,
      removeButtons: ['print', 'about', 'eraser', 'class name'],
      width: '100%',
      height: "500px",
      disableResizer: false,
      style: {
        font: '1.5rem Arial',
        color: '#0c0c0c',
        padding: "2rem"
      },
    }
  )
    , [])


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

    if (uploaderType === "featuredImage") {


      const totalItems = featuredImage.length + filteredItems.length

      if (totalItems > 1) {
        setShowAlert({
          type: "error",
          message: "You can upload only 1 featured image"
        })
      }


      const limitLeft = 1 - featuredImage.length

      filteredItems = filteredItems.slice(0, limitLeft);

    }


    if (uploaderType === "images") {


      const totalItems = images.length + filteredItems.length

      if (totalItems > 10) {
        setShowAlert({
          type: "error",
          message: "You can upload only 10 images for blogpost"
        })
      }


      const limitLeft = 10 - images.length

      filteredItems = filteredItems.slice(0, limitLeft);

    }

    if (filteredItems.length !== 0) {


      filteredItems.forEach(item => {

        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setArr(prev => [...prev, { name: item.name, url: reader.result }])
          }
        };

        reader.readAsDataURL(item);

      });
    }
  }

  const onDrop = (name, acceptedFiles) => {

    if (name === "featuredImage") {
      fileUploader("featuredImage", acceptedFiles, 'jpg, png and jpeg', setFeaturedImage)
    }

    if (name === "images") {
      fileUploader("images", acceptedFiles, 'jpg, png and jpeg', setImages)
    }

  }

  const removeItems = (index, setArr, type = "notContentImg") => {

    if (type === "contentImages") {

      let image = images[index]

      let pattern = /<img\s+[^>]*src=""[^>]*>/i;
      pattern = new RegExp(pattern, 'ig')

      let updatedContent = content.replaceAll(image.url, "");

      const imgTags = updatedContent.match(pattern);

      if(imgTags){
        imgTags.forEach((imageTag) => {
          updatedContent = updatedContent.replace(imageTag, "")
        })
      }

      setContent(updatedContent)

    }
    setArr(prev => prev.filter((_, i) => i != index));
  }

  const copyLink = async (link) => {


    navigator.clipboard.writeText(link).then(() => {
      setShowAlert({
        type: "success",
        message: "Link copied to clipboard!"
      })
    });
  }

  return (
    <div className={style.FormForThreadCreation}>
      <h1 className="sectionHeading">Write a Blogpost!</h1>
      <p className={style.subHeading} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Non modi laborum consequuntur minima explicabo dolorem quae numquam officia et optio, enim soluta deleniti quo nihil!</p>
      <div className={style.threadCreation}>
        <div className={style.header}>
          <div className={style.uploadedItems} >

            {
              featuredImage?.map((v, index) =>
                <div className={style.image} key={index}>
                  <img src={v.url} alt="" />
                  <RxCross1 className={style.crossIcon} onClick={() => removeItems(index, setFeaturedImage)} />
                </div>)
            }

            {
              images?.map((v, index) =>
                <div className={style.image} key={index}>
                  <img src={v.url} alt="" />
                  <RxCross1 className={style.crossIcon} onClick={() => removeItems(index, setImages, "contentImages")} />
                  <MdOutlineContentCopy className={style.copyIcon} onClick={() => copyLink(v.url)} />
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
        <form action="" className={style.form} onSubmit={blogpostActionHandler}>
          <div className={style.formFeatures}>


            <Dropzone onDrop={(e) => onDrop('featuredImage', e)}>
              {({ getRootProps, getInputProps }) => (
                <div className={style.options} {...getRootProps()}>
                  <input {...getInputProps()} />
                  <MdInsertPhoto className={style.icons} />
                  <span >Add Featured Image</span>
                </div>
              )}
            </Dropzone>

            <Dropzone onDrop={(e) => onDrop('images', e)}>
              {({ getRootProps, getInputProps }) => (
                <div className={style.options} {...getRootProps()}>
                  <input {...getInputProps()} />
                  <MdInsertPhoto className={style.icons} />
                  <span >Upload Images</span>
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
            <Link href={`/create?create=blogpost`} className={`${style.options} ${create === "blogpost" && style.activeOption} `}>
              <CgWebsite className={style.icons} />
              <span>Create a blogpost</span>
            </Link>
            <Link href={`/create?create=job`} className={`${style.options} ${create === "job" && style.activeOption} `}>
              <MdOutlineWorkHistory className={style.icons} />
              <span>Post a job</span>
            </Link>
          </div>
          <div className={style.formRightCol} >
            <input type="text" id="title" name="title" placeholder="Write a attractive title here" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea type="text" id="desc" name="desc" placeholder="Describe your blogpost" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onChange={newContent => setContent(newContent)}
            />

            <select className={style.categories} value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value={"cat - 1"}>Category - 1</option>
              <option value={"cat - 2"}>Category - 2</option>
              <option value={"cat - 3"}>Category - 3</option>
              <option value={"general"}>General</option>
            </select>

            <div className={style.tagsGroup}>
              <div className={style.tags} >

                {tags?.map((item, index) =>
                  <div className={style.tag} key={index} >
                    {item}
                    <RxCross1 className={style.crossIcon} onClick={() => removeItems(index, setTags)} />
                  </div>)
                }

              </div>
              <div className={style.tagForm} >
                <input type="text" placeholder="Add a Tag" name="tag" value={tag} onChange={(e) => setTag(e.target.value)} />
                <button type="button" onClick={addTagHandler}>Add Tag</button>
              </div>
            </div>
            <button className={style.publishBtn} type="submit" >
              {
                resourceData.error ? "Publish blogpost" : "Update blogpost"
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

export default FormForBlogPostCreation