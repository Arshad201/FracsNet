"use client"
import style from './RecentDiscussion.module.css'
import { useState } from 'react';
import PostCardSkeleton from '@/Components/Miscellaneous/PostCard/PostCardSkeleton';
import { fetchRecentThread } from '@/app/server-actions/thread/action';

let page = 2;
const LoadMore = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  const loadingMorePost = () =>{

    if(data.length === 6){
     setData([]);
     page = 2 

     return;

    }

    setLoading(true);
    fetchRecentThread(page).then((res)=>{
            setData([...data, ...res]);
            page++;
            setLoading(false);
    });

    
  }

  return (
    <>
      <div className={style.posts}>
              {data}
              {loading && 
              <>
              <PostCardSkeleton/>
              <PostCardSkeleton/>
              </>}
      </div>
      <button onClick={loadingMorePost} className={style.btn}> {data.length === 6 ? "Load Less" : "Load More"}</button>
    </>
  )
}

export default LoadMore