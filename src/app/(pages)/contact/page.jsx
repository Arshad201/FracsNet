import Link from "next/link";
import style from "./ContactPage.module.css";


const ContactPage = () => {
  
  return (
    <section className={style.contactPage}>
    <div className={`wrapper-width`}>
      <div className={style.wrapper}>
        <div className={style.imgBox}>
          <img src="/contactImg.jpg" alt="" />
        </div>
        <div className={style.formBox}>

          <h1 className="sectionHeading">Contact us!</h1>

          {/* contact with Email Form */}
          <form className={style.contactForm}>
            <div className={style.inputGroup}>
              <label htmlFor="name">Name</label>
              <input type="name" id="name"  placeholder="Enter your Name" required />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email"  placeholder="Enter your Email Address" required />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="message">Message</label>
              <textarea id="message"  placeholder="Write your message here..." required rows={10}/>
            </div>
            <button type="submit">Send</button>
          </form>

        </div>
      </div>
    </div>
  </section>
  )
}

export default ContactPage