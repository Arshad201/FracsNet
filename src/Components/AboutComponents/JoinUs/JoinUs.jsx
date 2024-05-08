import Link from 'next/link';
import style from './JoinUs.module.css';

const JoinUs = () => {
  return (
    <section className={style.joinSection}>
        <div className="wrapper-width">
            <div className={style.wrapper}>
                <div className={style.join}>
                    <div className={style.imgBox}>
                        <img src="/join.jpg" alt="" />
                    </div>
                    <div className={style.content}>
                        <h2 className="sectionHeading">Become a part of Our Community</h2>
                        <p>Ready to take your professional journey to the next level? Join [Your Community Name] today and become part of a vibrant community of professionals dedicated to success and growth. Whether you're looking to expand your network, learn from industry experts, or share your expertise with others, [Your Community Name] has something for everyone.</p>
                        <Link className={style.btn} href={"/register"}>Join us Today!</Link>
                    </div>
                </div>
                <div className={style.contact}>
                    <h2 className="sectionHeading">Contact Us</h2>
                    <p>Have questions or feedback? We'd love to hear from you! Contact our team at [contact@yourcommunity.com] for assistance or inquiries.</p>
                    <Link className={style.btn} href={"/contact"}>Contact</Link>
                </div>

            </div>
        </div>
    </section>
  )
}

export default JoinUs