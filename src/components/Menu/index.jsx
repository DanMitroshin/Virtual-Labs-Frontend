import React, {useCallback, useEffect, useState} from 'react';
import styles from "./styles.module.scss";
import {MAIN_URL} from "../../constants";
import Sidebar from "react-sidebar";
import cn from "classnames";

const menuElements = [
    {
        name: "Все проекты",
        link: MAIN_URL.PROJECTS,
    },
    {
        name: "О лаборатории",
        link: MAIN_URL.ABOUT_US,
    },
    {
        name: "Профиль",
        link: MAIN_URL.PROFILE,
    }
]


const Burger = ({open, setOpen}) => {
    return (
        <button
            onClick={() => setOpen(!open)}
            className={cn(styles.burger, open && styles.toClose)}
        >
            <div/>
            <div/>
            <div/>
        </button>
    )
}

const SlideBar = ({
                      onClick = () => {
                      }
                  }) => {

    const onChoose = useCallback((name) => {
        return () => onClick(name)
    }, [onClick])

    return <div className={styles.slideBarContainer}>
        {menuElements.map((item, index) => (
            <div onClick={onChoose(item.link)}
                 key={index.toString()}
                 className={styles.menuItem}
            >
                <p className={styles.menuItemText}>
                    {item.name}
                </p>
            </div>
        ))}
    </div>
}


function Header({onClick}) {

    const [open, setOpen] = useState(false);
    const onOpen = () => {
        setOpen(s => !s);
    }
    const onChoose = useCallback((name) => {
        setOpen(false);
        onClick(name);
    }, [onClick])

    // return
    // <Sidebar
    //     sidebar={<SlideBar onClick={onChoose}/>}
    //     open={open}
    //     onSetOpen={onOpen}
    //     // overlayClassName={styles.overlay}
    //     styles={{
    //         sidebar: {
    //             background: "white",
    //             position: "fixed",
    //         },
    //         overlay: {
    //             zIndex: -1,
    //             // position: "ab",
    //             // top: 0,
    //             // left: 0,
    //             // right: 0,
    //             // bottom: 0,
    //             opacity: 0,
    //             visibility: "hidden",
    //             transition: "opacity .3s ease-out, visibility .3s ease-out",
    //             transform: open ? "scale(1)" : "scale(0)",
    //             backgroundColor: "rgba(0,0,0,.3)"
    //         },
    //     }}
    // >
    return <div className={styles.fixedMenu}>
        <Burger open={open} setOpen={setOpen}/>
        <div className={cn(styles.hiddenDiv, open && styles.notHidden)}>
            <SlideBar onClick={onChoose}/>
        </div>
        {/*<p className={styles.title}>Menu</p>*/}
    </div>
    // </Sidebar>
}


export default Header;
