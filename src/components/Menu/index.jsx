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

const SlideBar = (
    {
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


function Header({onClick, children}) {

    const [open, setOpen] = useState(false);
    const onOpen = () => {
        setOpen(s => !s);
    }
    const onChoose = useCallback((name) => {
        setOpen(false);
        onClick(name);
    }, [onClick])

    return <Sidebar
        sidebar={
            <SlideBar onClick={onChoose}/>
        }
        open={open}
        onSetOpen={onOpen}
        // overlayClassName={styles.overlay}
        styles={{
            sidebar: {
                background: "white",
                position: "fixed",
            },
        }}
    >
        <div className={styles.fixedMenu}>
            <Burger open={open} setOpen={setOpen}/>
            {/*    <div className={cn(styles.hiddenDiv, open && styles.notHidden)}>*/}
            {/*        <SlideBar onClick={onChoose}/>*/}
            {/*    </div>*/}
            {/*<p className={styles.title}>Menu</p>*/}
        </div>
        {children}
    </Sidebar>
}


export default Header;
