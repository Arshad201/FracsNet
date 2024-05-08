import style from './SetNewPassword.module.css'

const SetNewPassword = () => {
  return (
    <div className={style.SetNewPassword}>
      <div className="wrapper-width">
        <img src="/logo.png" alt="" />
        <h1 className="sectionHeading">Set a New Password!</h1>
        <form className={style.form}>
              <div className={style.inputGroup}>
                <label htmlFor="password">New Password</label>
                <input type="password" id="password"  placeholder="Enter your New Password" required />
              </div>
              <div className={style.inputGroup}>
                <label htmlFor="cpassword">Confirm Password</label>
                <input type="password" id="cpassword"  placeholder="Confirm your New Password" required />
              </div>
              <button type="submit">Set New Password</button>
            </form>
      </div>
    </div> 
  )
}

export default SetNewPassword