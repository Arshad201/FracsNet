import style from './Newsletter.module.css';

const Newsletter = () => {
  return (
    <section className={style.Newsletter}>
        <div className="wrapper-width">
            <h2 className="sectionHeading">Subscribe to our Newsletter</h2>
            <form>
                <input type="email" placeholder='Enter your email'/>
                <button type='submit'>Subscribe</button>
            </form>
            
        </div>
    </section>
  )
}

export default Newsletter