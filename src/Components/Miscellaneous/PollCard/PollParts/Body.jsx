"use client"
import { useSession } from "next-auth/react";
import style from "../PollCard.module.css";
import { useState } from "react";
import { do_vote } from "@/app/server-actions/poll/poll";

const Body = ({data}) => {

    const {data:loggedInUser} = useSession();
    
    const [option_1, setOption_1] = useState(data.option_1);
    const [option_2, setOption_2] = useState(data.option_2);
    const [option_3, setOption_3] = useState(data.option_3);
    const [option_4, setOption_4] = useState(data.option_4);
    const [option_5, setOption_5] = useState(data.option_5);
    const [loading, setLoading] = useState("");
   

    const isVoted = (option) =>{
        return option.votes.includes(loggedInUser?._id);
    }

    const setVoteClass = (option) =>{
        return `${style.optionToVote} ${isVoted(option) && style.votedByYou}`
    }
    
    const voteHandler = async(option) =>{

        setLoading(option)
        try {

            const res = await do_vote(data._id, option);
            setOption_1(res.option_1)
            setOption_2(res.option_2)
            setOption_3(res.option_3)
            setOption_4(res.option_4)
            setOption_5(res.option_5)
            setLoading("")

            } catch (error) {
            setLoading("false")
            console.log(error.message);
        }

    }


    return (
        <div className={style.postBody}>
            <p className={style.postText}>{data.question}</p>
            <div className={style.optionsToVote}>
                <div className={setVoteClass(option_1)} onClick={()=>voteHandler('option_1')}>
                    <div className={style.percentageStrip} style={{ width: `${option_1.percentage}%` }}></div>
                    <span>
                        {loading === "option_1" ? "Voting..." : option_1.optionText}
                    </span>
                    {isVoted(option_1) && <span>You Voted!</span>}
                    <span>
                        {option_1.percentage}%
                    </span>
                </div>
                <div className={setVoteClass(option_2)} onClick={()=>voteHandler('option_2')}>
                    <div className={style.percentageStrip} style={{ width: `${option_2.percentage}%` }}></div>
                    <span>
                        {loading === "option_2" ? "Voting..." : option_2.optionText}
                    </span>
                    {isVoted(option_2) && <span>You Voted!</span>}
                    <span>
                        {option_2.percentage}%
                    </span>
                </div>
                {option_3.optionText && 
                <div className={setVoteClass(option_3)} onClick={()=>voteHandler('option_3')}>
                    <div className={style.percentageStrip} style={{ width: `${option_3.percentage}%` }}></div>
                    <span>
                        {loading === "option_3" ? "Voting..." : option_3.optionText}
                    </span>
                    {isVoted(option_3) && <span>You Voted!</span>}
                    <span>
                        {option_3.percentage}%
                    </span>
                </div>}
                {option_4.optionText && 
                <div className={setVoteClass(option_4)} onClick={()=>voteHandler('option_4')}>
                    <div className={style.percentageStrip} style={{ width: `${option_4.percentage}%` }}></div>
                    <span>
                        {loading === "option_4" ? "Voting..." : option_4.optionText}
                    </span>
                    {isVoted(option_4) && <span>You Voted!</span>}
                    <span>
                        {option_4.percentage}%
                    </span>
                </div>}
                {option_5.optionText && 
                <div className={setVoteClass(option_5)} onClick={()=>voteHandler('option_5')}>
                    <div className={style.percentageStrip} style={{ width: `${option_5.percentage}%` }}></div>
                    <span>
                        {loading === "option_5" ? "Voting..." : option_5.optionText}
                    </span>
                    {isVoted(option_5) && <span>You Voted!</span>}
                    <span>
                        {option_5.percentage}%
                    </span>
                </div>}
            </div>
        </div>
    )
}

export default Body