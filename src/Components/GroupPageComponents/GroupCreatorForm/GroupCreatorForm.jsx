"use client"
import { useState } from 'react';
import style from './GroupCreatorForm.module.css';

const GroupCreatorForm = () => {

    const [showGroupForm, setShowGroupForm] = useState(false);

    return (
        <div className={style.GroupCreatorForm}>
            <h1 className="sectionHeading">"Ready to Forge Connections? Create Your Group Now!"</h1>
            <button className={style.btn} onClick={() => setShowGroupForm(!showGroupForm)} >{showGroupForm ? "Hide" : "Show"} Group creator form</button>
            {showGroupForm && <form className={style.loginForm} onSubmit={(e) => e.preventDefault()}>
                <div className={style.inputGroup}>
                    <label htmlFor="title">Group Title</label>
                    <input type="text" id="title" name="title" placeholder="Enter Group title" required
                    />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="title">Group Title</label>
                    <input type="text" id="title" name="title" placeholder="Enter Group title" required
                    />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="description">Group Description</label>
                    <textarea rows={6} type="text" id="description" name="description" placeholder="Write a Group description" required></textarea>
                </div>
                <button type="submit">Create</button>
            </form>}
        </div>
    )
}

export default GroupCreatorForm