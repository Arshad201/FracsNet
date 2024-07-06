"use client"
import style from "./Links.module.css";
import Link from "next/link";
import { IoHomeOutline, IoNotificationsOutline, IoSearch} from "react-icons/io5";
import { BsPostcard } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { TfiPencilAlt } from "react-icons/tfi";
import { GrGroup } from "react-icons/gr";
import { usePathname } from "next/navigation";
import { AiOutlineMessage } from "react-icons/ai";

const Links = () => {

    const pathName = usePathname();

    const ourLinks = [
        {
            title: <IoHomeOutline  className={style.headerIcons}/>,
            path: '/'
        },
        {
            title: <FiUsers className={style.headerIcons}/>,
            path: '/network'
        },
        {
            title: <BsPostcard  className={style.headerIcons}/>,
            path: '/blog'
        },
        {
            title: <TfiPencilAlt className={style.headerIcons}/>,
            path: '/create'
        },
        {
            title: <GrGroup className={style.headerIcons}/>,
            path: '/group'
        },
        {
            title: <AiOutlineMessage className={style.headerIcons}/>,
            path: '/messages'
        },
        {
            title: <IoSearch className={style.headerIcons}/>,
            path: '/search'
        },
        {
            title: <IoNotificationsOutline className={style.headerIcons}/>,
            path: '/notification'
        },
    ]

  return (
    <nav className={`${style.navLinks}`}>
        {
            ourLinks.map((link)=><Link className={`${style.link} ${pathName === link.path && style.activeLink}`} key={link.path} href={link.path}>
                {link.title}
            </Link>)
        }
    </nav>
  )
}

export default Links