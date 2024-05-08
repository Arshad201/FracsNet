import style from './LoginForm.module.css'

const LoginForm = () => {
  return (
    <form className={style.loginForm} action={formAction}>
              <div className={style.inputGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email"  placeholder="Enter your Email Address" required />
              </div>
              <div className={style.inputGroup}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your Password" required />
              </div>
              <Link className={style.formLink} href={"/forgotpassword"}>forgot password</Link>
              <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm