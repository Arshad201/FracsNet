import Link from 'next/link'
import style from './ForgotPassword.module.css'

const ForgotPassword = () => {
  return (
    <div className={style.ForgotPassword}>
      <div className="wrapper-width">
        <img src="/logo.png" alt="" />
        <h1 className="sectionHeading">Recover your account!</h1>
        <form className={style.form}>
              <div className={style.inputGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email"  placeholder="Enter your Email Address" required />
              </div>
              <button type="submit">Recover your Account</button>
            </form>
      </div>
    </div> 
  )
}

export default ForgotPassword