import React from "react";
import styles from './styles.module.scss';

import cn from 'classnames';

function AppText({children, ...props}) {

    return <p className={styles.mainText}>
        {children}
    </p>;
}


export default AppText;
