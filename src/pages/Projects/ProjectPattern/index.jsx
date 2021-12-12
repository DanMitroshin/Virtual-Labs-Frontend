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
const height = window.innerHeight

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
        fileUrl = undefined,
    }) {

    const [headerState, setHeaderState] = useState(0);

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

        {headerState === 0 && typeof fileUrl === 'string' &&
        <div className={styles.refContainer}>
            {/*<a title="file" href={fileUrl}>*/}
            {/*    Скачать полное описание*/}
            {/*</a>*/}
            <iframe
                title="file"
                src={fileUrl}
                // width="100%"
                // height="100%"
                style={{
                    width: width * 0.8,
                    height: height * 0.8,
                }}
                frameBorder="0">

            </iframe>
        </div>}

    </div>
}

export default ProjectPattern;
