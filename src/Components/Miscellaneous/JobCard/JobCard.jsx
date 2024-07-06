import style from "./JobCard.module.css";
import Head from "./JobCardParts/Head";
import Body from "./JobCardParts/Body";
import Footer from "./JobCardParts/Footer";

const JobCard = ({data}) => {

    return (
        <div className={style.postCard}>
            <Head data={data}/>
            <Body data={data}/>
            <Footer data={data}/>
        </div>
    )
}

export default JobCard