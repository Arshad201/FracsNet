import style from "./PollCard.module.css";
import Head from "./PollParts/Head";
import Body from "./PollParts/Body";
import Footer from "./PollParts/Footer";

const PollCard = ({ data }) => {

    return (
        <div className={style.postCard}>
            <Head data={data} />
            <Body data={data} />
            <Footer data={data} />
        </div>
    )
}

export default PollCard