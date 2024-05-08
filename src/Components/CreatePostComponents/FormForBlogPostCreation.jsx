"use client"
import { useMemo, useRef, useState } from "react";
import style from "./FormForBlogPostCreation.module.css";
import JoditEditor from 'jodit-react';

const FormForBlogPostCreation = () => {

  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = {
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
     extraFonts: []
  }


  return (
    <div className={style.FormForThreadCreation}>
      <h1 className="sectionHeading">Write a Blogpost!</h1>
      <div className={style.threadCreation}>
        <div className={style.header}>
          <div className={style.userProfile}>
            {/* Profile Photo  */}
            <div className={style.profileImgWrapper}>
              <img src="/profile.jpg" alt="" />
            </div>
            <div className={style.metaData}>
              <span className={style.userName}>John Doe</span>
              {/* <span className={style.postedOn}>Web Developer</span> */}
            </div>
          </div>
        </div>
        <div className={style.body}>

          <form className={style.blogPostForm} onSubmit={(e) => e.preventDefault()}>
            <div className={style.inputGroup}>
              <label htmlFor="title">Blog Title</label>
              <input type="text" id="title" name="title" placeholder="Write a attractive title here" required />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="content">Content</label>
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                onChange={newContent => { }}
              />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="desc">Blog Description</label>
              <input type="text" id="desc" name="desc" placeholder="Describe your blogpost" required />
            </div>
            <button className={style.btn} type="submit">Post your blog!</button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default FormForBlogPostCreation