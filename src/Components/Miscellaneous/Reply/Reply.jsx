"use client";

import { load_replies } from '@/app/server-actions/comments/comments';
import style from './Reply.module.css';
import ReplyCard from './ReplyCard';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { StateContext } from '@/app/context/State';


const Reply = ({ data }) => {

    const { allReplyIds, replyArr, setReplyArr } = useContext(StateContext);

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(2);

    const loadReplies = async () => {


        try {

            setInitialLoading(true)
            const res = await load_replies(allReplyIds, 1);
            setReplyArr(res.replies);
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

            const res = await load_replies(allReplyIds, currentPage);
            setReplyArr(prev => [...prev, ...res.replies])

            if (currentPage > totalPages) {
                setCurrentPage(2)
                const res = await load_replies(allReplyIds, 1);
                setReplyArr(res.replies)
            }

            setLoading(false);

        } catch (error) {
            setLoading(false)
            return { error: "Unable to load replies!" };

        }
    }


    useEffect(() => {
        loadReplies();
    }, []);


    return (
        <div className={style.commentWrapper}>

            {<h6 className={style.heading}>{data.length} Replies</h6>}
            {
                initialLoading ? <AiOutlineLoading3Quarters className={`loadingIcon loadingM ${style.loadingIcon}`} />
                    : replyArr?.map((data, index) => <ReplyCard key={index} data={data} />)
            }
            {
                loading && <AiOutlineLoading3Quarters className={`loadingIcon loadingM ${style.loadingIcon}`} />
            }
            {(!loading && totalPages > 1) && <button className={style.loadMorebtn} onClick={handleLoadMore} >
                {currentPage > totalPages ? "Load less replies" : "Load more replies"}
            </button>}
        </div>
    )
}

export default Reply