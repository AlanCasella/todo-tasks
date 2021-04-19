import s from "../styles/about.module.css"

const about = () => {
    return (
        <div>
            <div className={s.aboutH3Div}>
            <h3>App made by Alan Casella</h3>
            </div>
            <div className={s.aboutADiv}>                
            <a className={s.aboutA} href="https://www.linkedin.com/in/alan-casella-8909bb1b8/">Linkedin</a> <br/>
            <a className={s.aboutA} href="https://github.com/AlanCasella">Github</a>
            </div>
        </div>
    );
};

export default about;