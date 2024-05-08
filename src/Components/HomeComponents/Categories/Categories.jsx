import style from "./Categories.module.css";

const Categories = () => {

    const categories = [
        "Web Development",
        "Mobile App Development",
        "DevOps",
        "Cloud Computing",
        "Data Science",
        "Artificial Intelligence (AI)",
        "Cybersecurity",
        "Quality Assurance (QA)",
        "Embedded Systems",
        "Game Development",
        "Blockchain Development",
        "Blockchain Development",
        "Search Engine Optimization (SEO)",
        "Search Engine Marketing (SEM)",
        "Social Media Marketing (SMM)",
        "Content Marketing",
        "Email Marketing",
        "Influencer Marketing",
        "Video Marketing",
        "Marketing Automation"
    ]
  return (
    <section className={style.categories}>
        <div className={'wrapper-width'}>
            <h2 className="sectionHeading">Professionals almost from all Categories</h2>
            <div className={style.categoryList}>
                {
                    categories.map((category)=><span key={category} className={style.category}>{category}</span>)
                }

                <span className={style.category}>
                    View All Categories
                </span>
            </div>
        </div>
    </section>
  )
}

export default Categories