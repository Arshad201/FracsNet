import style from "./OurMission.module.css";
import { IoPeopleOutline } from "react-icons/io5";
import { CgArrowTopRight } from "react-icons/cg";
import { VscFlame } from "react-icons/vsc";
import { PiHandshakeLight } from "react-icons/pi";

const OurMission = () => {
  return (
    <section className={style.OurMissionSection}>
        <div className={`${style.wrapper} wrapper-width`}>
            <div className={style.ourMission}>
                <h2>Our Mission</h2>
                <p>At FracsNet, we believe in the power of community. We're not just a website; we're a global hub where professionals from every field come together to connect, collaborate, and thrive.</p>
            </div>
            <div className={style.keyFeatures}>
                <div className={style.cardContainer}>
                <h3>Key Features</h3>
                    <div className={style.card}>

                        <IoPeopleOutline className={style.cardIcon} />
                        <span className={style.cardTitle}>Connect</span>
                        <p>We aim to connect professionals across industries, geographies, and expertise, facilitating meaningful relationships and opportunities for collaboration.</p>

                    </div>
                    <div className={style.card}>

                        <CgArrowTopRight className={style.cardIcon} />
                        <span className={style.cardTitle}>Empower</span>
                        <p>We aim to connect professionals across industries, geographies, and expertise, facilitating meaningful relationships and opportunities for collaboration.</p>

                    </div>
                    <div className={style.card}>

                        <VscFlame className={style.cardIcon} />
                        <span className={style.cardTitle}>Inspire</span>
                        <p>We aim to connect professionals across industries, geographies, and expertise, facilitating meaningful relationships and opportunities for collaboration.</p>

                    </div>
                    <div className={style.card}>

                        <PiHandshakeLight className={style.cardIcon} />
                        <span className={style.cardTitle}>Support</span>
                        <p>We aim to connect professionals across industries, geographies, and expertise, facilitating meaningful relationships and opportunities for collaboration.</p>

                        </div>

                </div>
            </div>
            <div className={style.videoBox}>
                <video src="/colvideo.mp4" autoPlay></video>
            </div>
        </div>
    </section>
  )
}

export default OurMission