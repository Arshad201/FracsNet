import style from './About.module.css';

const About = () => {
  return (
    <section className={style.about}>
        <div className="wrapper-width">
            <div className={style.imgBox}>
                <img src="/logo.png" alt="" />
            </div>
            <div className={style.content}>
                <h2 className={'sectionHeading'}>About the Community</h2>
                <p> FracsNet is made up of professionals from diverse backgrounds, industries, and regions, united by a shared passion for excellence and innovation. Our members include:</p>
                <ul>
                    <li>Entrepreneurs and startup founders</li>
                    <li>Industry experts and thought leaders</li>
                    <li>Freelancers and independent professionals</li>
                    <li>Corporate professionals and executives</li>
                    <li>Students and aspiring professionals</li>
                </ul>
            </div>
        </div>
    </section>
  )
}

export default About