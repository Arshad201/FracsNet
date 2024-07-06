"use client"
import style from "./signInPage.module.css";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { showAlert } from "@/lib/store/features/user/userSlice";


const signInPage = () => {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({ email: "arshad06@mail.com", password: "12345678" })

  const handleInputValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }


  //Login with Credentials
  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await signIn("credentials", { ...formData, redirect: true, });
      if (res.ok) {
        // dispatch(showAlert({ type: "success", message: "You're successfully loggedin", }))
      } else {
        // dispatch(showAlert({ type: "error", message: res.error, }))
      }
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.log(error);
    }

  }


  //Login with Google
  const loginWithGoogle = async () => {
    await signIn("google");

  }

  //Login with LinkedIn
  const loginWithLinkedIn = async () => {
    await signIn("linkedin");

  }

  return (
    <section className={style.loginPage}>
      <div className={`wrapper-width`}>
        <div className={style.wrapper}>
          <div className={style.imgBox}>
            <img src="/loginImg.jpg" alt="" />
          </div>
          <div className={style.formBox}>

            <h1 className="sectionHeading">Sign-In to FracsNet</h1>

            {/* Login With Social Media  */}
            <button className={style.loginWithSocial} onClick={loginWithGoogle}>
              <img src="/googleIcon.svg" alt="" />Sign-In with Google
            </button>
            <button className={style.loginWithSocial} onClick={loginWithLinkedIn}>
              <img src="/linkedInIcon.svg" alt="" />Sign-In with LinkedIn
            </button>

            {/* Seperator */}

            <div className={style.seperator}>
              <span className={style.line}></span>
              <span className={style.text}>Sign-In with Email</span>
              <span className={style.line}></span>
            </div>

            {/* Login with Email Form */}
            <form className={style.loginForm} onSubmit={handleLogin}>
              <div className={style.inputGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your Email Address" required
                  value={formData.email} onChange={(e) => handleInputValue(e)} />
              </div>
              <div className={style.inputGroup}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your Password" required
                  value={formData.password} onChange={(e) => handleInputValue(e)} />
              </div>
              <Link className={style.formLink} href={"/forgotpassword"}>forgot password</Link>
              <button type="submit">
                Sign-In
                {loading && <AiOutlineLoading3Quarters className={`loadingIcon loadingM ${style.loadingIcon}`} />}
              </button>
            </form>

          </div>
        </div>
      </div>
    </section>
  )
}

export default signInPage