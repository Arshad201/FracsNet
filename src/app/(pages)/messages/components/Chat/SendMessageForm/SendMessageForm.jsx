import style from './SendMessageForm.module.css'
import { BsFillSendFill } from "react-icons/bs";

const SendMessageForm = () => {
  return (
    <form className={style.SendMessageForm} >
        <input type="text" placeholder='Enter a Message' />
        <button type='submit'><BsFillSendFill  className={style.icon} /></button>
    </form>
  )
}

export default SendMessageForm