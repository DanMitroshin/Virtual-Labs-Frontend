import React from "react";
import styles from './styles.module.scss';

import cn from 'classnames';

function AppBoxInput({active, setActive, text}) {

    return <div className={styles.mainDiv} onClick={() => setActive(!active)}>
        <div className={cn(styles.box, active && styles.activeBox)}>
            <div className={cn(styles.innerBox, active && styles.activeInnerBox)}/>
        </div>
        <p className={styles.text}>{text}</p>
    </div>
}


export default AppBoxInput;
