"use client"
import { useInView } from 'react-intersection-observer'
import style from './FeaturedProfile.module.css'
import { useEffect, useState } from 'react';
import { fetchFeaturedProfile, fetchRecentThread } from '@/app/server-actions/user/action';

let page = 2;
const LoadMore = () => {

  const [data, setData] = useState([]);
  const {ref, inView} = useInView();
  const [loading, setLoading] = useState(false);


  const loadingMorePost = () =>{

    if(data.length === 6){
     setData([]);
     page = 2 
     return;

    }

    setLoading(true);
    fetchFeaturedProfile(page).then((res)=>{
            setData([...data, ...res]);
            page++;
            setLoading(false);
    });

    
  }

  return (
    <>
      <div className={style.profiles}>
              {data}
              {loading && 
              <>Loading...</>
              }
      </div>
      <button onClick={loadingMorePost} className={style.btn}> {data.length === 6 ? "Load Less" : "Load More"}</button>
    </>
  )
}

export default LoadMore