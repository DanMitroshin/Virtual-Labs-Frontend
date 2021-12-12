import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import styles from "./styles.module.scss";
import AppInput from "../../../../components/ui/AppInput";
import AppButton from "../../../../components/ui/AppButton";
import Plot from 'react-plotly.js';
import AppBoxInput from "../../../../components/ui/AppBoxInput";
import AppRangeStepInput from "../../../../components/ui/AppRangeStepInput";
import RequestWrapper from "../../../../helpers/RequestWrapper";
import RequestView from "../../../../components/RequestView";
import cn from "classnames";
import ArrayAppInput from "../../../../components/ui/ArrayAppInput";

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
        const InputComponent = item.isArray ? ArrayAppInput : AppInput
        return <InputComponent key={index.toString()}
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
    const [request, setRequest] = useState("")

    const [projectState, setProjectState] = useState([])
    // const [headerConfig, setHeaderConfig] = useState([])
    const [solverHeader, setSolverHeader] = useState([])
    const [activeHeader, setActiveHeader] = useState(0);

    const onClearError = useCallback(() => setError(""), [setError])

    const setTestValues = () => {
        onClearError()
        projectState.forEach(item => {
            item.value = item.example;
            item.error = item.isArray ? item.example.map(_ => "") : "";
        })
        setProjectState([...projectState])
    }


    const updateState = ({value, info, index}) => {
        onClearError();
        // if (projectState[index].isArray) {
        //     projectState[index].value = value;
        //     if (projectState[index].error.length < info.index) {
        //         let extraArray = Array(info.index - projectState[index].error.length).fill("")
        //         projectState[index].error = [...projectState[index].error, ...extraArray]
        //     }
        //     projectState[index].error[info.index] = info.error;
        // } else {
            projectState[index].value = value;
            projectState[index].error = info.error;
        // }
        // console.log("NEW PS", projectState)
        setProjectState(
            [...projectState]
        )
        // }
    }

    const setActiveProject = (activeProject) => {
        onClearError();
        let totalState = []
        // let counter = 0
        setLoading(false)
        activeProject.parameters.forEach((item) => {
            // counter += 1
            totalState.push({
                ...item,
                value: item.isArray ? [""] : "",
                error: item.isArray ? [""] : "",
                //setValue: (v) => updateState(v, counter),
            })
        })
        // console.log("TSSSSS", totalState)
        setProjectState(totalState)
        setRequest(`solver/${activeProject.request}`)
    }

    useLayoutEffect(() => {
        if (Array.isArray(project)) {
            setActiveProject(project[0])
            setSolverHeader(project.map(item => ({
                name: item.name,
                request: item.request,
            })))
        } else {
            setSolverHeader([
                {
                    name: project.name,
                    request: project.request,
                }
            ])
            setActiveProject(project)
        }
    }, [project])

    useEffect(() => {
        if (Array.isArray(project)) {
            setActiveProject(project[activeHeader])
        }
    }, [activeHeader, project])

    const myRef = useRef(null)
    const executeScroll = useCallback(() => {
        myRef.current.scrollIntoView({behavior: 'smooth'})
    }, [])

    // const {REQUEST} = RequestWrapper()

    const CheckValues = useCallback(() => {
        let err = ""
        projectState.forEach(item => {
            if (item.isArray) {
                item.error.forEach(val => {
                    if (val) {
                        err = "Некоторые поля содержат ошибки, которые надо исправить"
                    }
                })
                let counter = 0;
                item.value.forEach(val => {
                    if (!val && (val.toString().length === 0)) {
                        // console.log""
                        item.error[counter] = "Должно быть заполнено"
                        err = "Не все поля заполнены"
                        // console.log("ERR IN:", val)
                    }
                    counter += 1;
                })
            } else {
                if (item.error) {
                    err = "Некоторые поля содержат ошибки, которые надо исправить"
                }
                if (!item.value && (item.value.toString().length === 0)) {
                    item.error = "Должно быть заполнено"
                    err = "Не все поля заполнены"
                    // console.log("ERR IN:", item)
                }
            }
        })
        return err
    }, [projectState])

    const onClickToRequest = useCallback(() => {
        let err = CheckValues()
        if (err) {
            setError(err)
            return
        }
        setLoading(true);
        let timeout = setTimeout(executeScroll, 100);
        return () => clearTimeout(timeout)
    }, [CheckValues, executeScroll])

    const onRequest = (res) => {

        setNodes(res.json.nodes)
        // setLoading(true)
        // const req = `solver/${solverHeader[0].request}`
        // console.log("LOG SOLVER", request)
        // REQUEST.POST({request: request, body: {function: 'square', x: 5}})
        //     .then(res => {
        //     console.log("RES REQUEST", res)
        // })
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
    }, [nodes, executeScroll])

    // ############


    return <div className={styles.mainDiv}>
        {solverHeader.length > 1 && <div className={styles.headerContainer}>
            {/* header*/}
            {
                solverHeader.map(({name}, index) => (
                    <div key={index.toString()}
                         className={cn(styles.headerPoint,
                             index === activeHeader && styles.activeHeaderPoint)}
                         onClick={() => setActiveHeader(index)}
                    >
                        <h4>
                            {name}
                        </h4>
                    </div>
                ))
            }
        </div>}
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
            <AppButton onClick={onClickToRequest}>
                ПОСЧИТАТЬ
            </AppButton>
            <p className={styles.errorText}>
                {error}
            </p>
        </div>

        <div ref={myRef} className={styles.plotWrapper}>
            <RequestView loading={loading}
                         request={request}
                         needDoRequest={loading}
                         // processName={task}
                         onRequest={onRequest}>
                {
                    // loading ? <AppActivityIndicator processName={task}/> :
                    (nodes.length > 0 &&
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
            </RequestView>
        </div>
    </div>
}

export default SolverPattern;
