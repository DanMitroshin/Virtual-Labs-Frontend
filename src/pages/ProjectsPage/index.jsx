import React from 'react';
import styles from "./styles.module.scss";
import ProjectPreview from "../../components/ProjectPreview";
import {withRouter} from "react-router-dom";
import {MAIN_URL} from "../../constants";

const projects = [
    {
        title: "Метод для определения ламинарно-турбулентного перехода",
        description: "Это краткое описание проекта, в котором разъяснено, в чем суть проекта и для чего он нужен",
        name: MAIN_URL.PROJECTS_LIST.EN_LST_SOLVER,
    },
    {
        title: "Решатель систем ОДУ методом CROS",
        description: "Решатель систем ОДУ методом CROS",
        name: MAIN_URL.PROJECTS_LIST.CROS_SOLVER,
    },
    {
        title: "Газовая динамика",
        description: "Это краткое описание проекта #3, в котором разъяснено, в чем суть проекта и для чего он нужен",
        name: MAIN_URL.PROJECTS_LIST.GAS_DYNAMICS,
    },
    {
        title: "Beeler-Reuter",
        description: "Это краткое описание проекта #3, в котором разъяснено, в чем суть проекта и для чего он нужен",
        name: MAIN_URL.PROJECTS_LIST.HPL_SOLVER,
    },
    // {
    //     title: "Проект №4",
    //     description: "Это краткое описание проекта #4, в котором разъяснено, в чем суть проекта и для чего он нужен",
    //     name: MAIN_URL.PROJECTS_LIST.EXAMPLE,
    // },
    // {
    //     title: "Проект №5",
    //     description: "Это краткое описание проекта #5, в котором разъяснено, в чем суть проекта и для чего он нужен",
    //     name: MAIN_URL.PROJECTS_LIST.EXAMPLE,
    // },

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
                <div className={styles.projectWrapper}
                     key={index.toString()}
                >
                    <ProjectPreview
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
