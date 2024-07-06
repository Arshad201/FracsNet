"use client";
import { useContext, useState } from 'react';
import style from './ContactDetailsForm.module.css';
import { update_contactDetails } from '@/app/server-actions/user/action';
import { StateContext } from '@/app/context/State';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { City, Country, State } from "country-state-city";
import {
    FaFacebook,
    FaYoutube,
    FaWhatsapp,
    FaInstagram,
    FaTiktok,
    FaSnapchat,
    // FaXTwitter,
    FaLinkedinIn,
    FaPinterest,
    FaReddit,
    FaQuora,
    FaGlobe
} from "react-icons/fa";
import Link from 'next/link';
import { getCountryCallingCode, parsePhoneNumberFromString } from 'libphonenumber-js';


const socialIconsMap = {
    "facebook": FaFacebook,
    "youtube": FaYoutube,
    "whatsapp": FaWhatsapp,
    "instagram": FaInstagram,
    "tiktok": FaTiktok,
    "snapchat": FaSnapchat,
    // "twitter": FaXTwitter,
    "linkedin": FaLinkedinIn,
    "pinterest": FaPinterest,
    "reddit": FaReddit,
    "quora": FaQuora,
    "globe": FaGlobe
};

const socialIcons = Object.keys(socialIconsMap);

const ContactDetailsForm = ({ user, contact }) => {

    const { setShowAlert } = useContext(StateContext);

    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(null);

    const setInitialValue = (key) => {

        if (key === "city") return contact?.city ? contact.city :
            {
                city: "New Delhi",
                countryCode: "IN",
                stateCode: "DL",
            }

        if (key === "state") return contact?.state ? contact.state :
            {
                state: "Delhi",
                countryCode: "IN",
                stateCode: "DL",
            }

        if (key === "country") return contact?.country ? contact.country :
            {
                country: "India",
                countryCode: "IN",
                flag: "🇮🇳"
            }

        if (key === "phone") return contact?.phoneNumber ? contact.phoneNumber :
            {
                countryCode: "IN",
                number: ""
            }

        if (key === "email") return contact?.email ? contact.email : ""
        if (key === "s_links") return contact?.socialLinks ? contact.socialLinks : []

    }

    const [phoneNumber, setPhoneNumber] = useState(setInitialValue("phone"))
    const [email, setEmail] = useState(setInitialValue("email"))
    const [city, setCity] = useState(setInitialValue("city"))
    const [state, setState] = useState(setInitialValue("state"))
    const [country, setCountry] = useState(setInitialValue("country"))
    const [socialLinks, setSocialLinks] = useState(setInitialValue("s_links"))


    const countries = Country.getAllCountries();
    const states = State.getStatesOfCountry(country.countryCode)
    const cities = City.getCitiesOfState(state.countryCode, state.stateCode)


    const [socialLink, setSocialLink] = useState("")

    const changeCountryStateCity = (i, type) => {

        if (type === "country") {
            setCountry({ country: i.name, countryCode: i.isoCode, flag: i.flag })
            setState({ state: null, countryCode: null, stateCode: null })
            setCity({ city: null, countryCode: null, stateCode: null })
        }

        if (type === "state") {
            setState({ state: i.name, countryCode: country.countryCode, stateCode: i.isoCode })
            setCity({ city: null, countryCode: null, stateCode: null })
        }

        if (type === "city") {
            setCity({ city: i.name, countryCode: country.countryCode, stateCode: state.stateCode })
        }

    }

    const addNMoreLinks = (link) => {

        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/@?\w .-]*)*\/?(\?.*)?(#.*)?$/;

        if (!socialLink) {
            setShowAlert({
                type: "error",
                position: "bottom-left",
                message: "link is required to add it!"
            })

            return;
        }


        if (!urlPattern.test(link)) {
            setShowAlert({
                type: "warning",
                position: "bottom-left",
                message: "Enter a valid link!"
            })

            return;
        }
        setSocialLinks(prev => prev ? [...prev, link] : [link])
        setSocialLink("");
    }


    const settingUpdateVariable = (index, link) => {
        setUpdate(index)
        setSocialLink(link)
    }

    const updateArr = (link) => {

        setSocialLinks(prev => prev.map((value, index) => {
            if (index == Number(update)) {
                value = link
                return value
            }

            return value
        }))

        setSocialLink("")

        setUpdate(null)
    }

    const removeItems = (index, link) => {

        if (link == socialLink) {
            setUpdate(null)
        }
        setSocialLinks(prev => prev.filter((_, i) => i != index))

    }

    const inputValueHandler = (e, setObj) => {

        setObj(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const validateFields = () => {

        if (email) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailRegex.test(email)) {
                setShowAlert({
                    type: "error",
                    position: "bottom-left",
                    message: "Email is not valid!"
                })

                return false
            }
        }

        if (phoneNumber.number.length > 1) {

            const callingCode = getCountryCallingCode(phoneNumber.countryCode)
            const num = parsePhoneNumberFromString(`+${callingCode} ${phoneNumber.number}`);

            if (!num.isValid()) {

                setShowAlert({
                    type: "error",
                    position: "bottom-left",
                    message: "Phone Number is not valid!"
                })

                return false
            }

        }

        return true

    }

    const ContactDetailsAction = async (e) => {

        
        e.preventDefault();

        if(loading) return;

        const isValid = validateFields()

        if (!isValid) return;

        setLoading(true)

        const contactObj = {
            phoneNumber,
            email,
            city,
            state,
            country,
            socialLinks
        }

        try {

            const res = await update_contactDetails(contactObj);

            if (res.message) {
                setShowAlert({
                    type: "success",
                    position: "bottom-left",
                    message: res.message
                })
            }

            if (res.error) {
                setShowAlert({
                    type: "error",
                    position: "bottom-left",
                    message: res.error
                })
            }

            setLoading(false)


        } catch (error) {
            setLoading(false)
        }

    }

    const links = socialLinks?.map((link, index) => {
        const IconComponent = socialIcons.find(icon => link.includes(icon));
        const Icon = IconComponent ? socialIconsMap[IconComponent] : FaGlobe; // Default to FaGlobe if no specific icon found

        return (
            <div className={style.tag} key={index}>
                <Icon className={style.socialIcon} onClick={() => settingUpdateVariable(index, link)} />
                <RxCross1 className={style.crossIcon} onClick={() => removeItems(index, link)} />
            </div>
        );
    });


    return (
        <form className={style.Ud_form} onSubmit={ContactDetailsAction}>

            <h4 className={style.formHeading} >Contact Details</h4>

            <div className={style.groupInputGroups}>
                <div className={style.inputGroup}>
                    <label htmlFor="number">Phone Number </label>

                    <div className={style.phoneNumberInput} >

                        <select name="countryCode" value={phoneNumber.countryCode} onChange={(e) => inputValueHandler(e, setPhoneNumber)}>
                            {countries?.map((country, i) =>
                                <option key={i} value={country.isoCode} >
                                    {country.flag} {country.phonecode}
                                </option>)}
                        </select>

                        <input type="number" id="number" name="number" value={phoneNumber?.number} placeholder='phone Number' onChange={(e) => inputValueHandler(e, setPhoneNumber)} />

                    </div>

                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className={style.inputGroup} >

                    <label htmlFor="">Location</label>

                    <div>
                        <select name="country" defaultValue={country.country} >
                            {countries.map(i =>
                                <option key={i.isoCode} value={i.name} onClick={() => changeCountryStateCity(i, "country")}>
                                    {i.name} {i.flag}
                                </option>)}
                        </select>
                    </div>

                    {(country.country && states.length !== 0) &&
                        <div>
                            <select name="state" defaultValue={state.state} >
                                <option value="not-sel-state"> --- Select State ---</option>
                                {states?.map(i =>
                                    <option key={i.isoCode} value={i.name}
                                        onClick={() => changeCountryStateCity(i, "state")}>
                                        {i.name}</option>)}
                            </select>
                        </div>
                    }

                    {(state.state && cities.length !== 0) &&
                        <div>
                            <select name="city" defaultValue={city.city} >
                                <option value="not-sel-city"> --- Select City ---</option>
                                {cities?.map(i =>
                                    <option key={i.name} value={i.name} onClick={() => changeCountryStateCity(i, "city")}>{i.name}</option>)}
                            </select>
                        </div>}

                </div>


                {socialLinks.length > 0 &&
                    <div className={style.tags} >

                        {links}

                    </div>
                }

                <div className={style.inputGroup}>
                    <label htmlFor="link">Social Link</label>
                    <input type="text" id="link" value={socialLink} onChange={(e) => setSocialLink(e.target.value)} />
                </div>

                {
                    update == null &&
                    <button type='button' onClick={() => addNMoreLinks(socialLink)}>
                        {socialLinks.length > 0 ? "Add More Social Links" : "Add Social Link"}
                    </button>}

                {
                    update != null &&
                    <button type='button' onClick={() => updateArr(socialLink)}>Update Social Link</button>
                }

            </div>

            <button type="submit">
                Save changes
                {loading && <AiOutlineLoading3Quarters className={`loadingIcon loadingLight loadingM`} />}
            </button>
            <Link href={`/profile/${user.userName}`} className={"close-btn"} >Close</Link>
        </form>
    )
}

export default ContactDetailsForm