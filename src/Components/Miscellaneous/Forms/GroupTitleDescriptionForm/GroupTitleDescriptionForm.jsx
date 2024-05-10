import style from "./GroupTitleDescriptionForm.module.css";

const GroupTitleDescriptionForm = () => {
  return (
    <form className={style.G_td_form}>
              <div className={style.inputGroup}>
                <label htmlFor="title">Group Title</label>
                <input type="text" id="title" name="title" required />
              </div>
              <div className={style.inputGroup}>
                <label htmlFor="groupDescription">Group Description</label>
                <textarea rows={4} id="groupDescription" name="groupDescription" required></textarea>
              </div>
              <button type="submit">Save changes</button>
    </form>
  )
}

export default GroupTitleDescriptionForm