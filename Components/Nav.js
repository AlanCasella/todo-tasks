import Link from "next/link"
import s from "../styles/navbar.module.css"

const Nav = () => {
    return (
        <nav className={s.navbarDivContainer}>
            <div className={s.navbarDiv}>
            <ul className={s.navbarUl}>
                <li>
                <Link href="/"> Home </Link>
                </li>
                <li>
                <Link href="/about"> About </Link>
                </li>
                <li>
                <Link href="/tasks"> List </Link>
                </li>
                <li>
                <Link href="/add"> Add </Link>
                </li>
            </ul>
            </div>
        </nav>
    );
};

export default Nav;