"use client"
import Link from "next/link";
import style from "./LoginPage.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

const LoginPage = () => {

  const {data} = useSession();

  //Step - 1 Create state variable for form fields
  const [formData, setFormData] = useState({ email: "arshad06@mail.com", password: "12345678" })


  //Step - 2 Change input values on OnChange event
  const handleInputValue = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value});
  }


  //Step - 3 Submit form
  const handleLogin = async(e) =>{
    e.preventDefault();
    await signIn("credentials", formData);
  }


  //Login with Google
  const loginWithGoogle = async () =>{
    await signIn("google");

  }

   //Login with LinkedIn
   const loginWithLinkedIn = async () =>{
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

            <h1 className="sectionHeading">Login to FracsNet</h1>

            {/* Login With Social Media  */}
            <button className={style.loginWithSocial} onClick={loginWithGoogle}>
              <img src="/googleIcon.svg" alt="" />Login with Google
            </button>
            <button className={style.loginWithSocial} onClick={loginWithLinkedIn}>
              <img src="/linkedInIcon.svg" alt="" />Login with LinkedIn
            </button>

            {/* Seperator */}

            <div className={style.seperator}>
              <span className={style.line}></span>
              <span className={style.text}>Login with Email</span>
              <span className={style.line}></span>
            </div>

            {/* Login with Email Form */}
            <form className={style.loginForm} onSubmit={handleLogin}>
              <div className={style.inputGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email"  placeholder="Enter your Email Address" required 
                value={formData.email} onChange={(e)=>handleInputValue(e)}/>
              </div>
              <div className={style.inputGroup}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your Password" required 
                value={formData.password} onChange={(e)=>handleInputValue(e)}/>
              </div>
              <Link className={style.formLink} href={"/forgotpassword"}>forgot password</Link>
              <button type="submit">Login</button>
            </form>

          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage