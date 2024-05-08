import style from './Welcome.module.css';

const Welcome = () => {
  return (
    <section className={style.Welcome}>
        <div className="wrapper-width">

            <div className={style.wrapper}>
                <div className={style.content}>
                    <h1 className="sectionHeading">About FracsNet</h1>
                    <p>Welcome to FracsNet - the premier online platform for professionals around the world to connect, collaborate, and grow together.</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Welcome