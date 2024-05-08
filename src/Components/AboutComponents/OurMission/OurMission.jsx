import style from "./OurMission.module.css";
import { IoPeopleOutline, IoBookOutline } from "react-icons/io5";
import { VscTools } from "react-icons/vsc";
import { PiHandshakeLight } from "react-icons/pi";

const OurMission = () => {
  return (
    <section className={style.OurMissionSection}>
        <div className={`${style.wrapper} wrapper-width`}>
            <div className={style.videoBox}>
                <video src="/colvideo.mp4" autoPlay={true}></video>
            </div>
            <div className={style.ourMission}>
                <h2>Our Mission</h2>
                <p>At FracsNet, our mission is to empower professionals from diverse backgrounds and industries to thrive in their careers by providing a supportive and engaging online community. We believe in the power of networking, knowledge sharing, and continuous learning to drive personal and professional growth.</p>
            </div>
            <div className={style.keyFeatures}>
                <div className={style.cardContainer}>
                <h3>What we Offer?</h3>
                    <div className={style.card}>

                        <IoPeopleOutline className={style.cardIcon} />
                        <span className={style.cardTitle}>Networking Opportunities</span>
                        <p>We aim to connect professionals across industries, geographies, and expertise, facilitating meaningful relationships and opportunities for collaboration.</p>

                    </div>
                    <div className={style.card}>

                        <IoBookOutline className={style.cardIcon} />
                        <span className={style.cardTitle}>Knowledge Sharing</span>
                        <p>We aim to connect professionals across industries, geographies, and expertise, facilitating meaningful relationships and opportunities for collaboration.</p>

                    </div>
                    <div className={style.card}>

                        <VscTools className={style.cardIcon} />
                        <span className={style.cardTitle}>Collaboration Tools</span>
                        <p>We aim to connect professionals across industries, geographies, and expertise, facilitating meaningful relationships and opportunities for collaboration.</p>

                    </div>
                    <div className={style.card}>

                        <PiHandshakeLight className={style.cardIcon} />
                        <span className={style.cardTitle}>Support</span>
                        <p>We aim to connect professionals across industries, geographies, and expertise, facilitating meaningful relationships and opportunities for collaboration.</p>

                        </div>

                </div>
            </div>
            
        </div>
    </section>
  )
}

export default OurMission