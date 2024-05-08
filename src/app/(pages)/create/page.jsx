"use client";

import { useState } from 'react';
import style from './CreatePostPage.module.css';
import FormForBlogPostCreation from '@/Components/CreatePostComponents/FormForBlogPostCreation';
import FormForThreadCreation from '@/Components/CreatePostComponents/FormForThreadCreation';
const CreatePostPage = () => {

    const [visibleCreateThread, setVisibleCreateThread] = useState(true);

  return (
    <div className={style.CreatePostPage}>

        <div className="wrapper-width">

            {!visibleCreateThread ? 
            <FormForBlogPostCreation/> :
            <FormForThreadCreation/>}

            {!visibleCreateThread ? 
            <button className={style.btn} onClick={()=>setVisibleCreateThread(!visibleCreateThread)}>Create a Thread</button> :
            <button className={style.btn} onClick={()=>setVisibleCreateThread(!visibleCreateThread)}>Create a BlogPost</button>}

        </div>
    </div>
  )
}

export default CreatePostPage