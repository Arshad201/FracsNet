import Link from "next/link";
import style from "./RegisterPage.module.css";


const RegisterPage = () => {
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
            <img src="/googleIcon.svg" alt="" />register with Google
          </button>
          <button className={style.registerWithSocial}>
            <img src="/linkedInIcon.svg" alt="" />register with LinkedIn
          </button>

          {/* Seperator */}

          <div className={style.seperator}>
            <span className={style.line}></span>
            <span className={style.text}>Continue with Email</span>
            <span className={style.line}></span>
          </div>

          {/* register with Email Form */}
          <form className={style.registerForm}>
            <div className={style.inputGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email"  placeholder="Enter your Email Address" required />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your Password" required />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="password">Confirm Password</label>
              <input type="password" id="password" placeholder="Confirm your Password" required />
            </div>
            <Link className={style.formLink} href={"/login"}>Already registered?</Link>
            <button type="submit">register</button>
          </form>

        </div>
      </div>
    </div>
  </section>
  )
}

export default RegisterPage