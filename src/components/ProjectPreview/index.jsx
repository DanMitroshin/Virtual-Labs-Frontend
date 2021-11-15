import React, {useCallback} from "react";
import styles from './styles.module.scss';

import cn from 'classnames';
import AppButton from "../ui/AppButton";

function ProjectPreview(
    {
        onClick = () => {},
        title,
        description,
        name,
    }) {

    const onChoose = useCallback(() => onClick(name), [onClick, name])

    return <div className={styles.mainDiv}>
        <div className={styles.infoDiv}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
        <div className={styles.buttonDiv}>
            <AppButton onClick={onChoose}>
                ПОДРОБНЕЕ
            </AppButton>
        </div>
    </div>
}


export default ProjectPreview;
