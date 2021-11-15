import React from 'react';
import styles from "./styles.module.scss";
import ProjectPreview from "../../components/ProjectPreview";
import {withRouter} from "react-router-dom";
import {MAIN_URL} from "../../constants";

const projects = [
    {
        title: "Проект №1",
        description: "Это краткое описание проекта, в котором разъяснено, в чем суть проекта и для чего он нужен",
        name: MAIN_URL.PROJECTS_LIST.EXAMPLE,
    },
    {
        title: "Проект №2",
        description: "Это краткое описание проекта #2, в котором разъяснено, в чем суть проекта и для чего он нужен",
        name: MAIN_URL.PROJECTS_LIST.EXAMPLE,
    },
    {
        title: "Проект №3",
        description: "Это краткое описание проекта #3, в котором разъяснено, в чем суть проекта и для чего он нужен",
        name: MAIN_URL.PROJECTS_LIST.EXAMPLE,
    },
    {
        title: "Проект №4",
        description: "Это краткое описание проекта #4, в котором разъяснено, в чем суть проекта и для чего он нужен",
        name: MAIN_URL.PROJECTS_LIST.EXAMPLE,
    },
    {
        title: "Проект №5",
        description: "Это краткое описание проекта #5, в котором разъяснено, в чем суть проекта и для чего он нужен",
        name: MAIN_URL.PROJECTS_LIST.EXAMPLE,
    },

]


function ProjectsPage({history}) {

    const onDetail = (name) => {
        window.scroll(0, 0);
        history.push(name);
    }

    return <div className={styles.mainDiv}>
        <h1>Список проектов</h1>
        <div className={styles.projectsList}>
            {projects.map((item, index) => (
                <div className={styles.projectWrapper}>
                <ProjectPreview
                    key={index.toString()}
                    title={item.title}
                    description={item.description}
                    name={item.name}
                    onClick={onDetail}
                />
                </div>
            ))}
        </div>
    </div>
}

export default withRouter(ProjectsPage);
