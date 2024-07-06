"use client";
import { useState } from 'react';
import style from './NetworkList.module.css';
import { get_My_Network } from '@/app/server-actions/network/network';
import ProfileCardSM from '@/Components/Miscellaneous/ProfileCardSM/ProfileCardSM';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const LoadMore = ({ totalPages, loggedInUser }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(2);
    const [network, setNetwork] = useState([]);

    const handleLoadMore = async () => {

        setIsLoading(true);

        if (currentPage <= totalPages) {
            const network = await get_My_Network(currentPage, loggedInUser);
            setNetwork(prev => [...prev, ...network?.userNetwork])
            setCurrentPage(prev => prev + 1);
        }

        if (currentPage > totalPages) {
            setCurrentPage(2);
            setNetwork([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
    }

    return (
        <>
            {network?.map((i) =>
                <ProfileCardSM key={i._id} data={i} />
            )}
            {
                isLoading && 
                <div className='cardloader'>
                    <AiOutlineLoading3Quarters className={`loadingIcon loadingDark loadingM cardloading`} />
                </div>
            }
            <button className={style.btn}
                onClick={handleLoadMore}
            >
                {
                    currentPage > totalPages ? "Load less" : "Load more"
                }

            </button>
        </>
    )
}

export default LoadMore