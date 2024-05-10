import style from './UserDetailsForm.module.css';

const UserDetailsForm = () => {
    return (
        <form className={style.Ud_form}>
            <div className={style.groupInputGroups}>
                <div className={style.inputGroup}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" required />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" required />
                </div>
            </div>

            <div className={style.inputGroup}>
                <label htmlFor="designation">Designation</label>
                <input type="text" id="designation" name="designation" required />
            </div>

            <div className={style.inputGroup}>
                <label htmlFor="bio">Write about yourself in 25 words</label>
                <textarea rows={4} id="bio" name="bio" required></textarea>
            </div>
            <button type="submit">Save changes</button>
        </form>
    )
}

export default UserDetailsForm