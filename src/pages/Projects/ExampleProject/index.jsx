import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from "./styles.module.scss";
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from 'remark-math';
import AppInput from "../../../components/ui/AppInput";
import AppButton from "../../../components/ui/AppButton";
import Plot from 'react-plotly.js';
import {THEME} from "../../../constants/THEME";
import AppActivityIndicator from "../../../components/ui/AppActivityIndicator";
import AppBoxInput from "../../../components/ui/AppBoxInput";

const title = "Гипотеза Коллатца"
const description = "Для объяснения сути гипотезы рассмотрим следующую последовательность чисел, называемую сираку́зской после́довательностью. Берём любое натуральное число n. Если оно чётное, то делим его на 2, а если нечётное, то умножаем на 3 и прибавляем 1 (получаем $3n + 1$). Над полученным числом выполняем те же самые действия, и так далее.\n" +
    "\n" +
    "Гипотеза Коллатца заключается в том, что какое бы начальное число $n$ мы ни взяли, рано или поздно мы получим единицу\n" +
    "Эта гипотеза **считается самой простой нерешнной задачей**."

const width = window.innerWidth;

function ExampleProject() {

    const [number, setNumber] = useState(10);
    const [error, setError] = useState("")

    const [nodes, setNodes] = useState([])
    const [task, setTask] = useState("Считаем числа")

    const [useLoading, setUseLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    const onCount = () => {
        if (loading) {
            return;
        }
        let num
        try {
            num = Number(number)
            // console.log("NUM", num)
            if (isNaN(num)) {
                // console.log("NAN!!!")
                setError("Need to be a number")
                return;
            }
        } catch (e) {
            setError("Need to be a number")
            return;
        }
        if (num > 10000) {
            setError("Too big number [N <= 10000]")
            return;
        }
        // return;
        // executeScroll();
        if (useLoading) {
            setLoading(true);
        }
        let nodes_ = [num]
        while (num !== 1) {
            if (num % 2 === 0) {
                num = Math.round(num / 2)
            } else {
                num = num * 3 + 1
            }
            // console.log("NUM", num)
            nodes_.push(num)
        }
        if (!useLoading) {
            setNodes(nodes_)
        } else {
            setTimeout(() => setNodes(nodes_), 1000)
        }
    }

    useEffect(() => {
        if (nodes.length > 0) {
            // if (loading) {
            setLoading(false);
            setTimeout(executeScroll, 100)
            // } else {
            //     executeScroll();
            // }
            // executeScroll();
        } else {
            // if (useLoading) {
            //     setLoading(true)
            // }
        }
    }, [nodes])

    const onKeyDown = useCallback(e => {
        // обработайте нажатие клавиши.
        // console.log("KEY DOWN", e.key === "Enter")
        if (e.key === "Enter") {
            onCount();
        }
    }, [onCount])
    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView({ behavior: 'smooth' })

    const onClearError = useCallback(() => setError(""), [setError])

    // ############


    return <div className={styles.mainDiv}>
        <h3>{title}</h3>
        <ReactMarkdown plugins={[
            RemarkMathPlugin
        ]}>
            {description}
        </ReactMarkdown>
        <div className={styles.inputDiv}>
            <AppInput label={"Число"}
                      placeholder={"Введите число..."}
                      onKeyDown={onKeyDown}
                      value={number}
                      error={error}
                      onChangeValue={onClearError}
                      setValue={setNumber}/>
            <AppButton onClick={onCount}>
                ПОСЧИТАТЬ
            </AppButton>
        </div>
        <div className={styles.boxDiv}>
            <AppBoxInput text="Использовать имитацию запроса"
                         active={useLoading}
                         setActive={setUseLoading}
            />
        </div>

        <div ref={myRef} className={styles.plotWrapper}>
        {loading ? <AppActivityIndicator processName={task}/> : (nodes.length > 0 &&
            <Plot
                data={[
                    {
                        x: nodes.map((_, index) => index + 1),
                        y: nodes,
                        type: 'scatter',
                        mode: 'lines',
                        marker: {color: THEME.BLUE_400},
                    },
                ]}
                layout={{
                    // width: width * 0.8,
                    borderStyle: "solid",
                    borderWidth: 1,
                    title: 'Plot with numbers',
                    plot_bgcolor: THEME.BLUE_100,
                    // paper_bgcolor: THEME.BLUE_200,
                    // border_color: THEME.GREEN_500,
                    useResizeHandler: true,
                    autosize: true,
                }}
                useResizeHandler={true}
                style={{
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderColor: THEME.BLUE_500,
                    width: "100%",
                    height: "100%",
                    // background: THEME.BLUE_200,
                    // padding: 100
                }}
                config={{scrollZoom:true}}
            />
        // </div>
        )}
        </div>
    </div>
}

export default ExampleProject;
