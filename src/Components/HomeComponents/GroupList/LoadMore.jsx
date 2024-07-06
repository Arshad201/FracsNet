"use client";
import { useState } from 'react';
import style from './GroupList.module.css';
import GroupCardSM from '@/Components/Miscellaneous/GroupCardSM/GroupCardSM';
import { get_My_JoinedGroups, get_suggestedGroups } from '@/app/server-actions/group/group';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const LoadMore = ({ totalPages, loggedInUser, groupCardType }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(2);
    const [groups, setGroups] = useState([]);

    const handleLoadMore = async () => {

        setIsLoading(true);

        if (currentPage <= totalPages) {

            if (groupCardType === "joined") {

                const joinedGroups = await get_My_JoinedGroups(currentPage, loggedInUser);
                setGroups(prev => [...prev, ...joinedGroups?.groups])
                setCurrentPage(prev => prev + 1);
            }

            if (groupCardType === "not-joined") {

                const suggestedGroup = await get_suggestedGroups(currentPage, loggedInUser);
                setGroups(prev => [...prev, ...suggestedGroup?.groups])
                setCurrentPage(prev => prev + 1);
            }
        }

        if (currentPage > totalPages) {
            setCurrentPage(2);
            setGroups([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
    }

    return (
        <>
            {
                groupCardType === "joined" &&
                <>
                    {groups?.map((i) =>
                        <GroupCardSM key={i._id} data={i} groupCardType={"joined"} />
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
            }

            {
                groupCardType === "not-joined" &&
                <>
                    {groups?.map((i) =>
                        <GroupCardSM key={i._id} data={i} groupCardType={"not-joined"} />
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
            }

        </>

    )
}

export default LoadMore