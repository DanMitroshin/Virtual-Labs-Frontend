import React from 'react';
import styles from "./styles.module.scss";
import {withRouter} from 'react-router-dom';

/*import Header from "../Header";
import Footer from "../Footer";*/


function Content(
    {
        history,
        className = "empty",
        children,
    }) {

    return <div className={styles.content_main}>
        {children}
    </div>;
}


export default withRouter(Content);
