import React from "react";
import styles from './styles.module.scss';

import cn from 'classnames';

function AppButton({onClick = () => {}, className="styles.empty_class", type = "orange", children, ...props}) {

    return <button className={cn(styles.button)}
                   onClick={() => onClick()} {...props}>
        {children}
    </button>;
}


export default AppButton;
