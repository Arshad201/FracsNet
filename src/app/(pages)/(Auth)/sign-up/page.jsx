"use client";
import { useState } from "react";
import style from "./signUpPage.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction } from "@/lib/store/features/user/userAction";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";


const signUpPage = () => {

  const router = useRouter();

  const { loading, signUpErrors, alert } = useSelector(state=>state.userReducer)
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" })

  const handleInputValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSignUp = async(e) =>{
    e.preventDefault();
    dispatch(signUpAction(formData));
    console.log(alert)
    if(alert.type === "success"){
      alert("check")
      router.push("/");
    }
  }

  return (
    <section className={style.registerPage}>
      <div className={`wrapper-width`}>
        <div className={style.wrapper}>
          <div className={style.imgBox}>
            <img src="/loginImg.jpg" alt="" />
          </div>
          <div className={style.formBox}>

            <h1 className="sectionHeading">Join FracsNet Today!</h1>

            {/* register With Social Media  */}
            <button className={style.registerWithSocial}>
              <img src="/googleIcon.svg" alt="" />Sign-Up with Google
            </button>
            <button className={style.registerWithSocial}>
              <img src="/linkedInIcon.svg" alt="" />Sign-Up with LinkedIn
            </button>

            {/* Seperator */}

            <div className={style.seperator}>
              <span className={style.line}></span>
              <span className={style.text}>Continue with Email</span>
              <span className={style.line}></span>
            </div>

            {/* register with Email Form */}
            <form className={style.registerForm} onSubmit={handleSignUp}>
              <div className={style.inputGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your Email Address" onChange={(e) => handleInputValue(e)} />
              </div>
              <span className={style.inputError}>{signUpErrors?.email}</span>
              <div className={style.inputGroup}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your Password" onChange={(e) => handleInputValue(e)} />
              </div>
              <span className={style.inputError}>{signUpErrors?.password}</span>
              <div className={style.inputGroup}>
                <label htmlFor="password">Confirm Password</label>
                <input type="password" id="password" name="confirmPassword" placeholder="Confirm your Password" onChange={(e) => handleInputValue(e)} />
              </div>
              <span className={style.inputError}>{signUpErrors?.confirmPassword}</span>
              <Link className={style.formLink} href={"/sign-in"}>Already Signed-up?</Link>
              <button type="submit">
                Sign-up
                {loading && <AiOutlineLoading3Quarters className={`loadingIcon loadingM ${style.loadingIcon}`} />}
              </button>
            </form>

          </div>
        </div>
      </div>
    </section>
  )
}

export default signUpPage