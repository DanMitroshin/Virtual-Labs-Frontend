import React from "react";
import styles from './styles.module.scss';

import cn from 'classnames';

function AppActivityIndicator({processName = ""}) {

    return <div className={styles.mainDiv}>
        <div className={styles.ldsDualRing}/>
        {processName.length > 0 && <h4 className={styles.taskName}>
            {processName}
        </h4>}
    </div>
}


export default AppActivityIndicator;
