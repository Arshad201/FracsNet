import style from './CreatePostPage.module.css';
import FormForBlogPostCreation from '@/Components/CreatePostComponents/FormForBlogPostCreation';
import FormForThreadCreation from '@/Components/CreatePostComponents/FormForThreadCreation';
import FormForPollCreation from '@/Components/CreatePostComponents/FormForPollCreation';
import FormForJobCreation from '@/Components/CreatePostComponents/FormForJobCreation.jsx';
import ThreadGuide from '@/Components/CreatePostComponents/GuideToCreate/ThreadGuide/ThreadGuide';
import PollGuide from '@/Components/CreatePostComponents/GuideToCreate/PollGuide/PollGuide';
import BlogPostGuide from '@/Components/CreatePostComponents/GuideToCreate/BlogPostGuide/BlogPostGuide';
import { get_resource_byID } from '@/lib/data/resource';
import { redirect } from 'next/navigation';
import { GetSession } from '@/lib/utils/getSessionData';


const CreatePostPage = async ({ searchParams }) => {

  const { create, update, resource_id } = searchParams;

  const loggedInUser = await GetSession();
  let resourceData = await get_resource_byID(update, resource_id)
  resourceData = JSON.parse(JSON.stringify(resourceData))
  const postedBy = resourceData.postedBy ? resourceData.postedBy : (resourceData.employer ? resourceData.employer : resourceData.author)

  // If Error Then Redirect to Home
  if (update && resource_id) {
    
    if (resourceData.error) {
      redirect("/")
    }
  }

  // If LoggedIn User is not equal to postedBy then redirect
  if (update && resource_id) {
    if (postedBy != loggedInUser._id) {
      redirect("/")
    }
  }


  const show = (post_type) => {
    return (create === post_type || update === post_type)
  }

  return (
    <section className={style.homePrivate} >
      <div className="wrapper-width">
        <div className={style.contentGrid}>
          <div className={style.leftContent}>
            {/* Guide for Thread, Poll and Blogpost */}
            {show("thread") && <ThreadGuide />}
            {show("poll") && <PollGuide />}
            {show("blogpost") && <BlogPostGuide />}
            {show("job") && <BlogPostGuide />}
          </div>
          <div className={style.mainContent}>

            {show("thread") && <FormForThreadCreation resourceData={resourceData} />}

            {show("poll")  && <FormForPollCreation resourceData={resourceData} />}

            {show("blogpost")  && <FormForBlogPostCreation resourceData={resourceData} />}

            {show("job") && <FormForJobCreation resourceData={resourceData}/>}

          </div>
        </div>
      </div>
    </section>
  )
}

export default CreatePostPage