import style from "./ThreadCard.module.css";
import Head from "./ThreadParts/Head";
import Body from "./ThreadParts/Body";
import Footer from "./ThreadParts/Footer";

const ThreadCard = ({ data }) => {


    return (
        <div className={style.postCard}>
            <Head data={data} />
            <Body data={data} />
            <Footer data={data}/>
        </div>
    )
}

export default ThreadCard