"use client"
import { useContext, useState } from "react";
import style from "./FormForJobCreation.module.css";
import { MdInsertPhoto } from "react-icons/md";
import { GoFileDirectoryFill } from "react-icons/go";
import { CgPoll } from "react-icons/cg";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { MdFileCopy } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineWorkHistory } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { FaThreads } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import Dropzone from 'react-dropzone'
import { StateContext } from "@/app/context/State";
import { City, Country, State } from "country-state-city";
import { create_job, update_job } from "@/app/server-actions/job/job";
import { AiOutlineLoading3Quarters } from "react-icons/ai";



const FormForJobCreation = ({ resourceData }) => {

  const { setShowAlert, globalCurrency } = useContext(StateContext)
  const { data: loggedInUser } = useSession();
  const searchParams = useSearchParams();
  const create = searchParams.get('create');
  const update = searchParams.get('update');
  const resource_id = searchParams.get('resource_id');

  const [loading, setLoading] = useState(false);

  const initialValue = (key) => {

    let defaultV = "";

    if (key === "jobAgreement") defaultV = "full-time"
    if (key === "isRemote") defaultV = "remote"
    if (key === "payoutStructure") defaultV = "monthly"
    if (key === "postedIn") defaultV = null

    if (
      ["images",
        "files",
        "requirements",
        "benefits",
        "preferredQualifications",
        "skills"]
        .includes(key)) defaultV = []

    if (key === "country") defaultV = {
      country: "India",
      countryCode: "IN",
      flag: "🇮🇳",
    }

    if (key === "state") defaultV = {
      state: "Delhi",
      countryCode: "IN",
      stateCode: "DL",
    }

    if (key === "city") defaultV = {
      city: "New Delhi",
      countryCode: "IN",
      stateCode: "DL",
    }

    if (key === "payoutCurrency") defaultV = {
      name: globalCurrency.name,
      isoCode: globalCurrency.isoCode
    }

    return resourceData[key] ? resourceData[key] : defaultV

  }

  const [formData, setFormData] = useState(
    {
      title: initialValue("title"),
      description: initialValue("description"),
      jobAgreement: initialValue("jobAgreement"),
      isRemote: initialValue("isRemote"),
      payoutStructure: initialValue("payoutStructure"),
      payoutCurrency: initialValue("payoutCurrency"),
      payout: initialValue("payout"),
      company: initialValue("company"),
      companyWebsite: initialValue("companyWebsite"),
      applyByDate: initialValue("applyByDate"),
      postedIn: initialValue("postedIn"),
    }
  )
  const [country, setCountry] = useState(initialValue("country"));
  const [state, setState] = useState(initialValue("state"));
  const [city, setCity] = useState(initialValue("city"));

  const [images, setImages] = useState(initialValue("images"));
  const [files, setFiles] = useState(initialValue("files"));
  const [requirements, setRequirements] = useState(initialValue("requirements"));
  const [benefits, setBenefits] = useState(initialValue("benefits"));
  const [preferredQualifications, setPreferredQualifications] = useState(initialValue("preferredQualifications"));
  const [skills, setSkills] = useState(initialValue("skills"));

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(country.countryCode)
  const cities = City.getCitiesOfState(state.countryCode, state.stateCode)

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

  const listHandler = (action, index, setArr) => {

    if (action === "add") {

      setArr(prev => prev !== undefined ? [...prev, ""] : [""])

    }

    if (action === "delete") {

      setArr(prev => prev.filter((_, i) => i != index));

    }

  }

  const changeListValueHandler = (index, value, setArr) => {

    setArr(prev => prev.map((v, i) => {
      if (i == index) {
        return value
      }
      return v
    }))
  }

  const formDataHandler = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const formFieldValidator = () => {

    if (!formData.title) {
      setShowAlert({
        type: "error",
        message: "Job title is required!"
      })
      return false;
    }

    if (!formData.description) {
      setShowAlert({
        type: "error",
        message: "Job description is required!"
      })
      return false;
    }

    if (!formData.payout) {
      setShowAlert({
        type: "error",
        message: `Enter a payout in ${globalCurrency.name} ${globalCurrency.flag} for this job`
      })
      return false;
    }

    return true;
  }

  const jobActionHandler = async (e) => {

    e.preventDefault();

    const valid = formFieldValidator();



    if (!valid) {
      return;
    }


    setLoading(true)


    const jobObj = {
      images,
      files,
      ...formData,
      requirements,
      preferredQualifications,
      skills,
      benefits,
      country,
      state,
      city,
    }

    try {



      if (create) {



        const res = await create_job(jobObj);

        if (res.message) {
          setShowAlert({
            type: "success",
            message: res.message
          })
          setLoading(false)

          return;
        }

      }


      if (update && resource_id) {
        
        jobObj.jobId = resourceData._id
        const res = await update_job(jobObj);

        if (res.message) {
          setShowAlert({
            type: "success",
            message: res.message
          })

          setLoading(false)

          return;
        }

      }else{
        alert("in the else part")
      }


    } catch (error) {
      setShowAlert({
        type: "error",
        message: error.message
      })
      setLoading(false)

    }

  }

  const fileUploader = (uploaderType, acceptedFiles, allowedFiles, setArr) => {

    let isAlertInvoked = false;

    let filteredItems = acceptedFiles.filter((i, index) => {

      const extension = i.name.split('.').pop().toLowerCase();
      const isFileInvalid = allowedFiles.includes(extension);

      const sizeInBM = i.size / (1024 * 1024)

      if (sizeInBM > 20) {
        setShowAlert({
          type: "error",
          message: `Please Upload file under 20 MB`
        })

        return;
      }


      if (!isFileInvalid) {
        if (!isAlertInvoked) {
          setShowAlert({
            type: "error",
            message: `Only ${allowedFiles} files are allowed to upload`
          })
        }
        isAlertInvoked = true
      }

      return isFileInvalid === true

    });


    if (uploaderType === "images") {


      const totalItems = images.length + filteredItems.length

      if (totalItems > 5) {
        setShowAlert({
          type: "error",
          message: "You can upload only 5 images"
        })
      }


      const limitLeft = 5 - images.length

      filteredItems = filteredItems.slice(0, limitLeft);

    }

    if (uploaderType === "files") {


      const totalItems = files.length + filteredItems.length

      if (totalItems > 3) {
        setShowAlert({
          type: "error",
          message: "You can upload only 3 files"
        })
      }


      const limitLeft = 3 - files.length

      filteredItems = filteredItems.slice(0, limitLeft);

    }

    if (filteredItems.length !== 0) {


      filteredItems.forEach(item => {

        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {

            setArr(prev => [...prev, { name: item.name, url: reader.result }])
          }
        };

        reader.readAsDataURL(item);

      });
    }
  }

  const onDrop = (name, acceptedFiles) => {

    if (name === "images") {
      fileUploader("images", acceptedFiles, 'jpg, png and jpeg', setImages)
    }

    if (name === "files") {
      fileUploader("files", acceptedFiles, 'text, jpg, png, jpeg, pdf and html', setFiles)
    }

  }

  const removeItems = (index, setArr) => {
    setArr(prev => prev.filter((_, i) => i != index));
  }

  const returnFileName = (obj) => {
    return obj.name ? obj.name : obj.url.split("/")[obj.url.split("/").length - 1]
  }

  return (
    <div className={style.FormForThreadCreation} id="msges">
      <h1 className="sectionHeading">Post a Job!</h1>
      <p className={style.subHeading} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Non modi laborum consequuntur minima explicabo dolorem quae numquam officia et optio, enim soluta deleniti quo nihil!</p>
      <div className={style.threadCreation}>
        <div className={style.header}>
          <div className={style.uploadedItems} >
            {
              images?.map((v, index) =>
                <div className={style.image} key={index}>
                  <img src={v.url} alt="" />
                  <RxCross1 className={style.crossIcon} onClick={() => removeItems(index, setImages)} />
                </div>)
            }
            {

              files?.map((v, index) =>
                <div className={style.file} key={index}>
                  <span className={style.fileName} >
                    {returnFileName(v)}
                  </span>
                  <MdFileCopy className={style.icon} />
                  <RxCross1 className={style.crossIcon} onClick={() => removeItems(index, setFiles)} />
                </div>)
            }
          </div>
          <div className={style.userProfile}>
            <Link href={`/profile/${loggedInUser?.userName}`} className={style.profileImgWrapper}>
              <img src="/profile.jpg" alt="" />
            </Link>
            <div className={style.metaData}>
              <span className={style.userName}>John Doe</span>
            </div>
          </div>

        </div>
        <form action="" className={style.form} onSubmit={jobActionHandler}>
          <div className={style.formFeatures}>

            <Dropzone onDrop={(e) => onDrop('images', e)}>
              {({ getRootProps, getInputProps }) => (
                <div className={style.options} {...getRootProps()}>
                  <input {...getInputProps()} />
                  <MdInsertPhoto className={style.icons} />
                  <span >Add photos</span>
                </div>
              )}
            </Dropzone>

            <Dropzone onDrop={(e) => onDrop('files', e)}>
              {({ getRootProps, getInputProps }) => (
                <div className={style.options} {...getRootProps()}>
                  <input {...getInputProps()} />
                  <GoFileDirectoryFill className={style.icons} />
                  <span >Add Files</span>
                </div>
              )}
            </Dropzone>


            <Link href={`/create?create=thread`} className={`${style.options} ${create === "thread" && style.activeOption} `}>
              <FaThreads className={style.icons} />
              <span>Create a Thread</span>
            </Link>
            <Link href={`/create?create=poll`} className={`${style.options} ${create === "poll" && style.activeOption} `}>
              <CgPoll className={style.icons} />
              <span>Start a poll</span>
            </Link>
            <Link href={`/create?create=blogpost`} className={`${style.options} ${create === "blogpost" && style.activeOption} `}>
              <CgWebsite className={style.icons} />
              <span>Create a blogpost</span>
            </Link>
            <Link href={`/create?create=job`} className={`${style.options} ${create === "job" && style.activeOption} `}>
              <MdOutlineWorkHistory className={style.icons} />
              <span>Post a job</span>
            </Link>
          </div>
          <div className={style.formRightCol} >
            <input type="text" id="title" name="title" placeholder="Job Title (required)" value={formData.title} onChange={(e) => formDataHandler(e)} />
            <textarea type="text" id="desc" name="description" placeholder="Job Description (required)" value={formData.description} onChange={(e) => formDataHandler(e)} ></textarea>
            <div className={style.listInputBox} >
              {requirements?.map((v, index) =>
                <div className={style.listInput} key={index}>
                  <textarea type="text"
                    placeholder="Job requirement"
                    value={v}
                    onChange={(e) => changeListValueHandler(index, e.target.value, setRequirements)}
                  ></textarea>
                  <button type="button" className={style.btn} onClick={() => listHandler("delete", index, setRequirements)}>Delete</button>
                </div>)}

              <button type="button" className={style.btn} onClick={() => listHandler("add", null, setRequirements)}>
                {requirements.length == 0 ? "Add Job Requirement" : "Add More Job Requirements"}
              </button>

            </div>
            <div className={style.listInputBox} >
              {benefits?.map((v, index) =>
                <div className={style.listInput} key={index}>
                  <textarea
                    placeholder="Job benefits"
                    value={v}
                    onChange={(e) => changeListValueHandler(index, e.target.value, setBenefits)}
                  ></textarea>
                  <button type="button" className={style.btn} onClick={() => listHandler("delete", index, setBenefits)}>Delete</button>
                </div>)}

              <button type="button" className={style.btn} onClick={() => listHandler("add", null, setBenefits)}>
                {benefits.length == 0 ? "Add Job Benefits" : "Add More Job Benefits"}
              </button>

            </div>
            <div className={style.listInputBox} >
              {preferredQualifications?.map((v, index) =>
                <div className={style.listInput} key={index}>
                  <textarea
                    placeholder="preferred Qualification"
                    value={v}
                    onChange={(e) => changeListValueHandler(index, e.target.value, setPreferredQualifications)}
                  ></textarea>
                  <button type="button" className={style.btn} onClick={() => listHandler("delete", index, setPreferredQualifications)}>Delete</button>
                </div>)}

              <button type="button" className={style.btn} onClick={() => listHandler("add", null, setPreferredQualifications)}>
                {preferredQualifications.length == 0 ? "Add preferred Qualifications" : "Add More preferred Qualifications"}
              </button>

            </div>
            <div className={style.listInputBox} >
              {skills?.map((v, index) =>
                <div className={style.listInput} key={index}>
                  <input
                    type="text"
                    placeholder="skill"
                    value={v}
                    onChange={(e) => changeListValueHandler(index, e.target.value, setSkills)}
                  />
                  <button type="button" className={style.btn} onClick={() => listHandler("delete", index, setSkills)}>Delete</button>
                </div>)}
              <button type="button" className={style.btn} onClick={() => listHandler("add", null, setSkills)}>
                {skills.length == 0 ? "Add skills" : "Add More skills"}
              </button>

            </div>

            <div className={style.inputGroup} >
              <label htmlFor="jobAgreement">Select a Job Agreement</label>
              <select name="jobAgreement" id="jobAgreement" defaultValue={formData.jobAgreement} onChange={(e) => formDataHandler(e)}>
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="contract">Contract</option>
                <option value="temporary">Temporary</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div className={style.radioInput} >

              <div>
                <label htmlFor="remote">Remote</label>
                <input type="radio" id="remote" name="isRemote" value="remote" checked={formData.isRemote === "remote" ? true : false} onChange={(e) => formDataHandler(e)} />
              </div>

              <div>
                <label htmlFor="hybrid">Hybrid</label>
                <input type="radio" id="hybrid" name="isRemote" value="hybrid" checked={formData.isRemote === "hybrid" ? true : false} onChange={(e) => formDataHandler(e)} />
              </div>

              <div>
                <label htmlFor="onsite">Onsite</label>
                <input type="radio" id="onsite" name="isRemote" value="onsite" checked={formData.isRemote === "onsite" ? true : false} onChange={(e) => formDataHandler(e)} />
              </div>

            </div>
            <div className={style.inputGroup} >
              <label htmlFor="payoutStructure">Select a Payout</label>
              <select name="payoutStructure" id="payoutStructure" defaultValue={formData.payoutStructure} onChange={(e) => formDataHandler(e)}>
                <option value="hourly" >Hourly</option>
                <option value="daily" >Daily</option>
                <option value="weekly"  >Weekly</option>
                <option value="bi-weekly" >Bi-weekly</option>
                <option value="semi-monthly" >Semi-monthly</option>
                <option value="monthly" >Monthly</option>
                <option value="quarterly" >Quarterly</option>
                <option value="yearly" >Yearly</option>
              </select>
            </div>
            <div className={style.inputGroup} >
              <label htmlFor="payout">Enter a Payout in {globalCurrency.name}</label>
              <input type="number" placeholder="Example - 1000" name="payout" id="payout" value={formData.payout} onChange={(e) => formDataHandler(e)} />
            </div>

            <div className={style.inputGroup} >
              <label htmlFor="company">Enter a Company name</label>
              <input type="text" placeholder="Example - XYZ Technologies" id="company" name="company" value={formData.company} onChange={(e) => formDataHandler(e)} />
            </div>

            <div className={style.inputGroup} >
              <label htmlFor="companyUrl">Enter a Company Website URL</label>
              <input type="text" placeholder="Example - XYZ.company.com" id="companyUrl" name="companyWebsite" value={formData.companyWebsite} onChange={(e) => formDataHandler(e)} />
            </div>

            <div className={style.inputGroup} >

              <label htmlFor="">Location</label>

              <div>
                <select name="country" defaultValue={country.country} onChange={(e) => formDataHandler(e)}>
                  {countries.map(i =>
                    <option key={i.isoCode} value={i.name} onClick={() => changeCountryStateCity(i, "country")}>
                      {i.name} {i.flag}
                    </option>)}
                </select>
              </div>

              {
                (country.country && states.length !== 0)
                &&
                <div>
                  <select name="state" defaultValue={state.state} onChange={(e) => formDataHandler(e)}>
                    <option value="not-sel-state"> --- Select State ---</option>
                    {states?.map(i =>
                      <option key={i.isoCode} value={i.name}
                        onClick={() => changeCountryStateCity(i, "state")}>
                        {i.name}</option>)}
                  </select>
                </div>
              }

              {
                (state.state && cities.length !== 0)
                &&
                <div>
                  <select name="city" defaultValue={city.city} onChange={(e) => formDataHandler(e)}>
                    <option value="not-sel-city"> --- Select City ---</option>
                    {cities?.map(i =>
                      <option key={i.name} value={i.name} onClick={() => changeCountryStateCity(i, "city")}>{i.name}</option>)}
                  </select>
                </div>}

            </div>

            <div className={style.inputGroup} >
              <label htmlFor="companyUrl">Last Date to Apply</label>
              <input type="date" id="companyUrl" name="applyByDate" value={formData.applyByDate} onChange={(e) => formDataHandler(e)} />
            </div>

            <button className={style.btn} type="submit">
              {
                resourceData.error ? "Publish the Job" : "Update Job"
              }
              {loading &&
                <AiOutlineLoading3Quarters className={`loadingIcon loadingLight loadingM`} />}

            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormForJobCreation