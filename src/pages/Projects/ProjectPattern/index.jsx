import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import styles from "./styles.module.scss";
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from 'remark-math';
import rehypeKatex from 'rehype-katex';
// import gfm from 'remark-gfm'
import cn from 'classnames';
import SolverPattern from "./SolverPattern";
import 'katex/dist/katex.min.css'

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

    return <div className={styles.mainDiv}>
        <ReactMarkdown
                plugins={[
                    RemarkMathPlugin,
                    // rehypeKatex,
                ]}
                rehypePlugins={[rehypeKatex]}
                // children={`The lift coefficient ($C_L$) is a dimensionless coefficient.`}
            >
                {title}
            </ReactMarkdown>
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
            <ReactMarkdown
                plugins={[
                    RemarkMathPlugin,
                    // rehypeKatex,
                ]}
                rehypePlugins={[rehypeKatex]}
                // children={`The lift coefficient ($C_L$) is a dimensionless coefficient.`}
            >
                {description}
            </ReactMarkdown>
            :
            <SolverPattern project={project}/>}
    </div>
}

export default ProjectPattern;
