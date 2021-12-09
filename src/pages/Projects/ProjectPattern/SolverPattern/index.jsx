import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import styles from "./styles.module.scss";
import AppInput from "../../../../components/ui/AppInput";
import AppButton from "../../../../components/ui/AppButton";
import Plot from 'react-plotly.js';
import {THEME} from "../../../../constants/THEME";
import AppActivityIndicator from "../../../../components/ui/AppActivityIndicator";
import AppBoxInput from "../../../../components/ui/AppBoxInput";
import AppRangeStepInput from "../../../../components/ui/AppRangeStepInput";
import RequestWrapper from "../../../../helpers/RequestWrapper";

const width = window.innerWidth;

const INPUT_TYPES = {
    NUMBER: 'number',
    POSITIVE: 'positive',
    STEP: 'step',
    BOOL: 'bool',
    TEXT: 'text',
}

const GetInputComponent = (item, index, setValue) => {
    if (item.type === INPUT_TYPES.NUMBER || item.type === INPUT_TYPES.TEXT ||
        item.type === INPUT_TYPES.POSITIVE) {
        let from = item.type === INPUT_TYPES.POSITIVE ? 0 : item.from
        let type = item.type === INPUT_TYPES.POSITIVE ? INPUT_TYPES.NUMBER : item.type
        let placeholder = item.type === INPUT_TYPES.TEXT ? "" : "Введите число..."
        let totalItem = {...item, type, placeholder}
        return <AppInput key={index.toString()}
                         from={from}
                         setValue={setValue}
                         {...totalItem}
        />
    }
    if (item.type === INPUT_TYPES.STEP) {
        return <AppRangeStepInput key={index.toString()}
                                  setValue={setValue}
                                  {...item}/>
    }
    if (item.type === INPUT_TYPES.BOOL) {
        return <AppBoxInput key={index.toString()}
                            setActive={setValue}
                            {...item}/>
    }
}

function SolverPattern(
    {
        project,
    }
) {

    const [error, setError] = useState("")

    const [nodes, setNodes] = useState([])
    const [task, setTask] = useState("Считаем числа")

    const [loading, setLoading] = useState(false);

    const [projectState, setProjectState] = useState([])
    const [solverHeader, setSolverHeader] = useState([])

    const setTestValues = () => {
        projectState.forEach(item => {
            item.value = item.example
        })
        setProjectState([...projectState])
    }

    const updateState = ({value, info, index}) => {
        projectState[index].value = value;
        projectState[index].error = info.error;
        // console.log("NEW PS", projectState)
        setProjectState(
            [...projectState]
        )
    }

    useLayoutEffect(() => {
        if (Array.isArray(project)) {
            //
        } else {
            setSolverHeader([
                {
                    name: project.name,
                    request: project.request,
                }
            ])
            let totalState = []
            let counter = 0
            project.parameters.forEach((item) => {
                counter += 1
                totalState.push({
                    ...item,
                    value: "",
                    //setValue: (v) => updateState(v, counter),
                })
            })
            // console.log("TSSSSS", totalState)
            setProjectState(totalState)
            // foreac
            // for (let key in parameters.args)
        }
    }, [project])

    const {REQUEST} = RequestWrapper()

    const onRequest = () => {
        setLoading(true)
        const req = `solver/${solverHeader[0].request}`
        console.log("LOG SOLVER", req)
        REQUEST.POST({request: req, body: {function: 'square', x: 5}})
            .then(res => {
            console.log("RES REQUEST", res)
        })
    }

    useEffect(() => {
        if (nodes.length > 0) {
            // if (loading) {
            setLoading(false);
            setTimeout(executeScroll, 100)
        } else {
            // if (useLoading) {
            //     setLoading(true)
            // }
        }
    }, [nodes])

    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView({behavior: 'smooth'})

    const onClearError = useCallback(() => setError(""), [setError])

    // ############


    return <div className={styles.mainDiv}>
        <AppButton onClick={setTestValues}>
            ТЕСТОВЫЙ ПРИМЕР
        </AppButton>
        <div className={styles.inputsListDiv}>
            {projectState.map((item, index) =>
                GetInputComponent(item, index, (value, info = {error: ''}) =>
                    updateState({value, info, index}))
            )}
        </div>
        <div className={styles.requestButton}>
        <AppButton onClick={onRequest}>
            ПОСЧИТАТЬ
        </AppButton>
        </div>

        <div ref={myRef} className={styles.plotWrapper}>
            {loading ? <AppActivityIndicator processName={task}/> : (nodes.length > 0 &&
                <div>{nodes.toString()}</div>
                // <Plot
                //     data={[
                //         {
                //             x: nodes.map((_, index) => index + 1),
                //             y: nodes,
                //             type: 'scatter',
                //             mode: 'lines',
                //             marker: {color: THEME.BLUE_400},
                //         },
                //     ]}
                //     layout={{
                //         // width: width * 0.8,
                //         borderStyle: "solid",
                //         borderWidth: 1,
                //         title: 'Plot with numbers',
                //         plot_bgcolor: THEME.BLUE_100,
                //         // paper_bgcolor: THEME.BLUE_200,
                //         // border_color: THEME.GREEN_500,
                //         useResizeHandler: true,
                //         autosize: true,
                //     }}
                //     useResizeHandler={true}
                //     style={{
                //         borderWidth: 2,
                //         borderStyle: "solid",
                //         borderColor: THEME.BLUE_500,
                //         width: "100%",
                //         height: "100%",
                //         // background: THEME.BLUE_200,
                //         // padding: 100
                //     }}
                //     config={{scrollZoom: true}}
                // />
                // </div>
            )}
        </div>
    </div>
}

export default SolverPattern;
