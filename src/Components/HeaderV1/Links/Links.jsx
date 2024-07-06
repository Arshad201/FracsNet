import style from "./Links.module.css";
import Link from "next/link";

const Links = ({mobileMenu}) => {

    const ourLinks = [
        {
            title: 'Blog',
            path: '/blog'
        },
        {
            title: 'About',
            path: '/about'
        },{
            title: 'Contact',
            path: '/contact'
        },
        {
            title: 'Sign-In',
            path: '/sign-in'
        },
    ]
  return (
    <nav className={`${style.navLinks} ${mobileMenu ? style.openMobileMenu: style.closeMobileMenu }`}>
        {
            ourLinks.map((link)=><Link className={style.link} key={link.title} href={link.path}>{link.title}</Link>)
        }
    </nav>
  )
}

export default Links