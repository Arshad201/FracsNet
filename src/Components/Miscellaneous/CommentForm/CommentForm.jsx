"use client";
import style from './CommentForm.module.css';
import { MdOutlinePermMedia } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { LuClipboardEdit } from "react-icons/lu";
import { do_comment, do_reply, update_comment, update_reply } from '@/app/server-actions/comments/comments';
import { StateContext } from '@/app/context/State';
import Dropzone from 'react-dropzone'



const CommentForm = ({ formType, commentId }) => {



    const {

        setShowAlert,

        postType,

        openPost,
        setOpenPost,

        scrollToComment,
        setScrollToComment,

        scrollToCommentForm,

        updateReply,
        setUpdateReply,

        setUpdateComment,
        updateComment,

        setOpenReply,

        openComment,
        setOpenComment,

        allCommentIds,
        setAllCommentIds,
        commentArr,
        setCommentArr,

        allReplyIds,
        setAllReplyIds,
        replyArr,
        setReplyArr } = useContext(StateContext);

    const initalValue = () => {

        if (formType === "comment") {
            setText(updateComment?.commentText ? updateComment.commentText : "")
            setImage(updateComment?.commentImage ? updateComment.commentImage : {})
        }

        if (formType === "reply") {
            setText(updateReply?.replyText ? updateReply.replyText : "")
            setImage(updateReply?.replyImage ? updateReply.replyImage : {})
        }

    }
    const [text, setText] = useState("");
    const [image, setImage] = useState({});
    const [loading, setLoading] = useState(false);

    const commentHandler = async (e) => {

        e.preventDefault();

        if (!image.url && !text) {
            setShowAlert({
                type: "error",
                message: `Write a ${formType} or upload an image!`
            })

            return;
        }

        setLoading(true);


        try {

            if (formType === "comment") {

                const formData = {
                    commentText: text,
                    commentImage: image
                }

                if (!updateComment) {

                    const res = await do_comment(formData, openPost, postType);
                    setLoading(false)
                    setCommentArr(prev => {
                        if (prev === undefined) {
                            return [res.comment];
                        } else {
                            return [res.comment, ...prev]
                        }
                    });

                    setAllCommentIds(prev => {
                        if (prev === undefined) {
                            return [res.comment._id];
                        } else {
                            return [res.comment._id, ...prev]
                        }
                    });

                    setText("")
                    setImage("")

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

                    return

                } else {

                    const res = await update_comment(formData, updateComment);

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

                        return;
                    }
                    setLoading(false)
                    setCommentArr(prev => prev.map((i) => (i._id === updateComment._id) ? res.comment : i));
                    setUpdateComment(null);
                    setImage({})
                    setText("")
                    setScrollToComment(res.comment._id)
                    setTimeout(() => {
                        setScrollToComment(null)
                    }, 100)
                    return;
                }



            }

            if (formType === "reply") {


                const formData = {
                    replyText: text,
                    replyImage: image
                }

                const comment = openComment ? openComment : commentId

                if (!updateReply) {

                    const res = await do_reply(formData, comment);
                    setReplyArr(prev => {
                        if (prev === undefined) {
                            return [res.reply]
                        } else {
                            return [res.reply, ...prev]
                        }
                    })

                    setAllReplyIds(prev => {
                        if (prev === undefined) {
                            return [res.reply]
                        } else {
                            return [res.reply._id, ...prev]
                        }
                    })

                    setCommentArr(prevComments =>
                        prevComments.map(commentObj =>
                            commentObj._id === comment
                                ? { ...commentObj, replies: [...commentObj.replies, res.reply._id] }
                                :
                                commentObj
                        )
                    )

                    setOpenComment(comment)
                    setText("")
                    setImage("")
                    setLoading(false)

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

                    return

                }else{

                    const res = await update_reply(formData, updateReply);
                    setReplyArr(prev => prev.map((i) => (i._id === updateReply._id) ? res.reply : i));
                    
                    setText("")
                    setImage({})
                    setOpenReply(null)
                    setUpdateReply(null)
                    setLoading(false)

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

                    return

                }

            }

        } catch (error) {

            setLoading(false)
            console.log(error.message);
            return { error: error.message }

        }
    }

    const onDrop = (acceptedFiles) => {

        let fileToUpload = acceptedFiles[0];
        let allowedFiles = 'jpg, png and jpeg'

        const extension = fileToUpload.name.split('.').pop().toLowerCase();
        const isFileInvalid = allowedFiles.includes(extension);

        const sizeInBM = fileToUpload.size / (1024 * 1024)

        if (sizeInBM > 5) {
            setShowAlert({
                type: "error",
                message: `Please Upload file under 5 MB`
            })

            return;
        }


        if (!isFileInvalid) {
            setShowAlert({
                type: "error",
                message: `Only ${allowedFiles} files are allowed to upload`
            })

            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {

                setImage({ name: fileToUpload.name, url: reader.result })

            }
        };

        reader.readAsDataURL(fileToUpload);
    }

    const commentRef = useRef(null);


    useEffect(() => {

        initalValue()

        if (scrollToCommentForm && formType === "comment") {
            commentRef.current.scrollIntoView({ behavior: 'smooth' });
        }

    }, [scrollToCommentForm, updateReply])

    return (
        <div className={style.commentFormWrapper} ref={commentRef}>


            {image?.url &&
                <div className={style.image}>
                    <img src={image.url} alt="" />
                    <RxCross1 className={style.crossIcon} onClick={() => setImage({})} />
                </div>}


            <div className={style.commentFormBox}>
                {/* Profile Photo */}
                <div className={style.profilePic}>
                    <img src="/profile.jpg" alt="" />
                </div>
                <form onSubmit={commentHandler}>
                    <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3}
                        placeholder={
                            postType === "job" ?
                                (formType === "comment" ? "Write a Job Proposal.." : "Reply to Applicants...")
                                :
                                `Write a ${formType}...`
                        }>

                    </textarea>

                    <Dropzone onDrop={(e) => onDrop(e)}>
                        {({ getRootProps, getInputProps }) => (
                            <div className={style.options} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <MdOutlinePermMedia className={style.icon} />
                            </div>
                        )}
                    </Dropzone>

                    <button type='submit'>
                        {
                            loading ?
                                <AiOutlineLoading3Quarters className={`${style.icon} loadingIcon loadingDark loadingM cardloading`} />
                                : <>
                                    {
                                        (updateComment && formType === "comment")
                                        && <LuClipboardEdit className={style.icon} />
                                    }
                                    {
                                        (updateReply && formType === "reply")
                                        && <LuClipboardEdit className={style.icon} />
                                    }
                                    {
                                        (!updateComment && formType === "comment") &&
                                        <BsFillSendFill className={style.icon} />
                                    }
                                                                        {
                                        (!updateReply && formType === "reply")
                                        && <BsFillSendFill className={style.icon} />
                                    }
                                </>
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CommentForm