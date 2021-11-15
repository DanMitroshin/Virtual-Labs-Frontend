import React, {useState} from 'react';
import styles from "./styles.module.scss";
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from 'remark-math';
import AppInput from "../../../components/ui/AppInput";
import AppButton from "../../../components/ui/AppButton";
import Plot from 'react-plotly.js';

const title = "Гипотеза Коллатца"
const description = "Для объяснения сути гипотезы рассмотрим следующую последовательность чисел, называемую сираку́зской после́довательностью. Берём любое натуральное число n. Если оно чётное, то делим его на 2, а если нечётное, то умножаем на 3 и прибавляем 1 (получаем $3n + 1$). Над полученным числом выполняем те же самые действия, и так далее.\n" +
    "\n" +
    "Гипотеза Коллатца заключается в том, что какое бы начальное число $n$ мы ни взяли, рано или поздно мы получим единицу"

function ExampleProject() {

    const [number, setNumber] = useState(10);
    const [error, setError] = useState("")

    const [nodes, setNodes] = useState([])

    const onCount = () => {
        let num
        try {
            num = Number(number)
            console.log("NUM", num)
        } catch (e) {
            setError("Need to be a number")
            return;
        }
        if (num > 1000) {
            setError("Too big number [N <= 1000]")
            return;
        }
        return;
        let nodes = [num]
        while (num !== 1 || nodes.length > 10) {
            if (num % 2 === 0) {
                num = Math.round(num / 2)
            } else {
                num = num * 3 + 1
            }
            nodes.push(num)
        }
        setNodes(nodes)
    }

    return <div className={styles.mainDiv}>
        <h3>{title}</h3>
        <ReactMarkdown plugins={[
            RemarkMathPlugin
        ]}>
            {description}
        </ReactMarkdown>
        <div className={styles.inputDiv}>
        <AppInput label={"Number"}
                  value={number}
                  error={error}
                  setValue={setNumber}/>
            <AppButton onClick={onCount}>ПОСЧИТАТЬ</AppButton>
        </div>

        {nodes.length > 0 && <Plot
            data={[
                {
                    x: nodes.map((_, index) => index + 1),
                    y: nodes,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                },
            ]}
            layout={{width: 320, height: 240, title: 'A Fancy Plot'}}
        />}
    </div>
}

export default ExampleProject;
