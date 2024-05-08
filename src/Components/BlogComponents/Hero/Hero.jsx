import Link from 'next/link'
import style from './Hero.module.css'

const Hero = () => {
  return (
    <section className={style.hero}>
        <h1>
            Be a part of our community, Post blog and learn from blog.
        </h1>
        <Link className={style.btn} href={"/register"}>Join Now</Link>
    </section>
  )
}

export default Hero