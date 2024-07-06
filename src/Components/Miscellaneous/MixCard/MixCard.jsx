import JobCard from "../JobCard/JobCard"
import PollCard from "../PollCard/PollCard"
import ThreadCard from "../ThreadCard/ThreadCard"

const MixCard = ({ data }) => {

    if (data.threadText || data.threadImage) {

        return (
            <>
                <ThreadCard data={data} />
            </>
        )
    }

    if (data.question) {

        return (
            <>

                <PollCard data={data} />
            </>
        )
    }

    if (data.title) {

        return (
            <>
                <JobCard data={data} />
            </>
        )
    }

}

export default MixCard