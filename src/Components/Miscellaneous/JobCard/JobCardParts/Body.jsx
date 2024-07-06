"use client";
import Link from "next/link";
import style from "../JobCard.module.css";
import { useState } from "react";

const Body = ({ data }) => {

    const [readMore, setReadmore] = useState(false);

    const currencyFormatter = (number, currency) => {

        return number.toLocaleString('en-US', {
            style: 'currency',
            currency
        });

    }

    return (
        <div className={style.postBody}>

            {data.images?.length > 1 ?
                <div className={style.threadImages} >
                    {data.images?.map(i => <img src={i.url} alt="" />)}
                </div>
                :
                <>
                    {data.images.length !== 0 && <img className={style.threadImage} src={data.images[0].url} alt="" />}
                </>
            }

            <div className={style.titleDescWrapper}>
                <h5 className={style.jobTitle}>{data.title}</h5>
                <p className={style.jobDesc}>
                    {
                        !readMore ? `${data.description.slice(0, 100)}...` : data.description
                    }
                </p>
            </div>



            {readMore && <>

                {data.requirements.length !== 0 &&
                    <div className={style.listBox}>
                        <h6>Requirements</h6>
                        <ul>
                            {data.requirements.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>}


                {data.preferredQualifications.length !== 0 &&
                    <div className={style.listBox}>
                        <h6>Preferred Qualifications</h6>
                        <ul>
                            {data.preferredQualifications.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>}


                {data.skills.length !== 0 &&
                    <div className={style.listBox}>
                        <h6>Required Skills</h6>
                        <ul>
                            {data.skills.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>}

                {/* Correction needed in Job Type, isRemote, applyByDate */}
                <div className={style.listBox}>
                    <h6>Job Agreement</h6>
                    <ul>
                        <li>{data.jobAgreement}</li>
                    </ul>
                </div>


                {data.isRemote &&
                    <div className={style.listBox}>
                        <h6>IsRemote</h6>
                        <ul>
                            <li>{data.isRemote}</li>
                        </ul>
                    </div>}

                {data.payout &&
                    <div className={style.listBox}>
                        <h6>Payout</h6>
                        <ul>
                            <li>
                                {currencyFormatter(data.payout, data.payoutCurrency.name)} ({data.payoutStructure})
                            </li>
                        </ul>
                    </div>}

                {data.applyByDate &&
                    <div className={style.listBox}>
                        <h6>Close On</h6>
                        <ul>
                            <li>{data.applyByDate}</li>
                        </ul>
                    </div>}


                {data.company &&
                    <div className={style.listBox}>
                        <h6>Company</h6>
                        <ul>
                            <li>
                                <Link href={data.companyWebsite}>
                                    {data.company}
                                </Link>
                            </li>
                        </ul>
                    </div>}

                {data.location &&
                    <div className={style.listBox}>
                        <h6>Location</h6>
                        <ul>
                            <li>{data.location.city}, {data.location.state} - ({data.location.country})</li>
                        </ul>
                    </div>}


                {data.benefits.length !== 0 &&
                    <div className={style.listBox}>
                        <h6>Benefits</h6>
                        <ul>
                            {data.benefits.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>}


                {
                    data.files?.map((v, index) =>
                        <Link href={v.url} target="_blank" className={style.file} key={index}>
                            {v.url.split("/")[v.url.split("/").length - 1]}
                        </Link>)
                }

            </>}

            {
                <span className={style.readMoreBtn}
                    onClick={() => setReadmore(!readMore)}>
                    {!readMore ? "Read more" : "Read less"}
                </span>
            }

        </div>
    )
}

export default Body