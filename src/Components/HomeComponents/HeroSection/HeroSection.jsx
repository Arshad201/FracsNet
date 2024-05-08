import Link from "next/link";
import style from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <section className={style.heroSection}>
      <div className={`${style.wrapper} wrapper-width`}>
        {/* Text Box  */}
        <div className={style.textBox}>
            <h1 className={style.heroHeading}>Connect, Collaborate, Succeed: Join FracsNet Fractional Network Today!</h1>
            <Link href={'/register'} className={style.heroBtn}>Join Us</Link>
        </div>
        {/* Image Box */}
        <div className={style.heroImgBox}>
          <img src="/heroImg.jpg" alt="hero" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection