import style from '../../Profile.module.css';
import { FaRegEdit } from "react-icons/fa";
import Link from 'next/link';
import { GetSession } from '@/lib/utils/getSessionData';
import {
    FaFacebook,
    FaYoutube,
    FaWhatsapp,
    FaInstagram,
    FaTiktok,
    FaSnapchat,
    FaXTwitter,
    FaLinkedinIn,
    FaPinterest,
    FaReddit,
    FaQuora,
    FaGlobe
} from "react-icons/fa";

const ContactDetails = async ({ user, contact }) => {


    const loggedInUser = await GetSession();

    const formatMsg = (key) => {

        let msg = "";
        if (loggedInUser?._id == user?._id) {
            msg = `Add ${key}`;
        } else {
            msg = `${key} is not added yet`;
        }

        return <span className={style.value} >{msg}</span>

    }

    const phoneNumber = contact?.phoneNumber;
    const address = contact?.address;
    const socialLinks = contact?.socialLinks;

    return (
        <>
            <div className={style.contentBox4}>
                <span className={style.boxTitle}>Contact</span>

                {phoneNumber ?
                    <div>
                        <span className={style.title}>Phone Number</span>

                        <span className={style.value}>{phoneNumber?.number}</span>
                    </div>
                    : <>{formatMsg("Phone Number")}</>
                }


                {contact?.email ?
                    <div>
                        <span className={style.title}>Email</span>
                        <span className={style.value}>{contact?.email}</span>
                    </div>
                    : formatMsg("Email")
                }
                {
                    (contact.city || contact.state || contact.country) ?
                        <>
                            <div>
                                <span className={style.title}>Location</span>
                                <span className={style.value}>


                                    {
                                        contact?.city.city &&
                                        <>
                                            {contact?.city.city} &nbsp; - &nbsp;
                                        </>
                                    }

                                    {
                                        contact?.state.state &&
                                        <>
                                            {contact?.state.state} &nbsp;
                                        </>
                                    }
                                    {
                                        contact?.country.country &&
                                        <>
                                            {contact?.country.country}
                                            &nbsp;
                                            {contact?.country.flag}
                                        </>
                                    }

                                </span>
                            </div>
                        </>

                        :

                        <>
                            {formatMsg("Address")}
                        </>

                }
                {socialLinks?.length != 0 ?
                    <>
                        <div className={style.socialMediaLinks}>

                            {
                                contact?.socialLinks?.map((link, index) =>
                                    <Link key={index} href={link}>                                         
                                    socialLink
                                    </Link>)
                            }

                        </div>
                    </> :
                    <>
                        {formatMsg("Social Links")}
                    </>
                }
                {
                    loggedInUser?._id == user?._id &&
                    <Link href={`/profile/${user?.userName}?update=contact`} className={style.editBtn}>

                        <FaRegEdit className={style.editIcon} />
                    </Link>
                }
            </div>
        </>

    )
}

export default ContactDetails