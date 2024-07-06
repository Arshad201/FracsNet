"use client"
import style from './Comment.module.css';
import { useContext, useEffect, useState } from 'react';
import CommentCard from './CommentCard';
import { load_comments } from '@/app/server-actions/comments/comments';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CommentForm from '../CommentForm/CommentForm';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { StateContext } from '@/app/context/State';


const Comment = () => {

  const {postType, commentArr, setCommentArr, allCommentIds} = useContext(StateContext);

  // const [commentArr, setCommentArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(2);

  const loadComments = async () => {

    try {

      setInitialLoading(true)
      const res = await load_comments(allCommentIds, 1);
      setCommentArr(res.comments); 
      setTotalPages(res.totalPages);
      setInitialLoading(false)

    } catch (error) {
      setInitialLoading(false);
      return { error: "Unable to load replies!" };
    }
  }


  const handleLoadMore = async () => {

    try {

      setLoading(true);

      if (currentPage <= totalPages) {
        setCurrentPage(prev => prev + 1)
      }

      const res = await load_comments(allCommentIds, currentPage);
      setCommentArr(prev => [...prev, ...res.comments])

      if (currentPage > totalPages) {
        setCurrentPage(2)
        const res = await load_comments(allCommentIds, 1);
        setCommentArr(res.comments)
      }

      setLoading(false);

    } catch (error) {
      setLoading(false)
      return { error: "Unable to load replies!" };

    }
  }


  useEffect(() => {
    loadComments();
  }, []);


  return (
    <div className={style.commentWrapper}>

      <CommentForm
        formType={"comment"}
      /> 
      <h6 className={style.heading}>{allCommentIds.length} {postType === "job" ? "Applicants" : "Comments"}</h6>

      {
        initialLoading ? <AiOutlineLoading3Quarters className={`loadingIcon loadingM ${style.loadingIcon}`} />
          : commentArr?.map((data, index) => <CommentCard key={index} data={data} />)
      }
      {
        loading && <AiOutlineLoading3Quarters className={`loadingIcon loadingM ${style.loadingIcon}`} />
      }
      {(!loading && totalPages > 1) && <button className={style.loadMorebtn} onClick={handleLoadMore} >
        {currentPage > totalPages ? "Load less comments" : "Load more comments"}
      </button>}
    </div>
  )
}

export default Comment