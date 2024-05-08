import style from "./NavigationForBlog.module.css";
const NavigationForBlog = () => {

    const options = [
        // Software Engineering
        'Web Development',
        'Mobile App Development',
        'DevOps',
        'Cloud Computing',
        'Data Science',
        'Artificial Intelligence (AI)',
        'Cybersecurity',
        'Quality Assurance (QA)',
        'Embedded Systems',
        'Game Development',
        'Blockchain Development',
        'Enterprise Software',
        // Digital Marketing
        'Search Engine Optimization (SEO)',
        'Search Engine Marketing (SEM)',
        'Social Media Marketing (SMM)',
        'Content Marketing',
        'Email Marketing',
        'Influencer Marketing',
        'Affiliate Marketing',
        'Video Marketing',
        'Mobile Marketing',
        'Marketing Analytics',
        'Conversion Rate Optimization (CRO)',
        'Marketing Automation'
      ];
  return (
    <div className={style.NavigationForBlog}>
        <div className="wrapper-width">
            <h2 className="sectionHeading">
                Search Blogs by Category
            </h2>
            <div className={style.navs}>
                {options.map((option)=><span className={style.option} key={option}>{option}</span>)}
            </div>
        </div>
    </div>
  )
}

export default NavigationForBlog