import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import styles from "./styles.module.scss";
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from 'remark-math';
import cn from 'classnames';
import SolverPattern from "./SolverPattern";

const width = window.innerWidth;

const headerArray = [
    {
        name: "Описание"
    },
    {
        name: "Солвер"
    }
]

function ProjectPattern(
    {
        title,
        description,
        project,
    }) {

    const [headerState, setHeaderState] = useState(1);

    useLayoutEffect(() => {

    }, [])

    const [number, setNumber] = useState(10);
    const [error, setError] = useState("")

    const [nodes, setNodes] = useState([])

    const [loading, setLoading] = useState(false);

    const [rangeValue, setRangeValue] = useState(90)


    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView({behavior: 'smooth'})

    const onClearError = useCallback(() => setError(""), [setError])


    return <div className={styles.mainDiv}>
        <h3>
            {title}
        </h3>
        <div className={styles.headerWrapper}>
            {
                headerArray.map(({name}, index) => (
                    <div key={index.toString()}
                         className={cn(styles.headerPoint,
                             index === headerState && styles.activeHeaderPoint)}
                         onClick={() => setHeaderState(index)}
                    >
                        <h4>
                            {name}
                        </h4>
                    </div>
                ))
            }
        </div>
        {headerState === 0 ?
            <ReactMarkdown plugins={[
                RemarkMathPlugin
            ]}>
                {description}
            </ReactMarkdown> :
            <SolverPattern project={project} />}
    </div>
}

export default ProjectPattern;
