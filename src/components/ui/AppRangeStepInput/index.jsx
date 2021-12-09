import React, {useState} from "react";
import styles from './styles.module.scss';
import {THEME} from "../../../constants/THEME";

// import cn from 'classnames';

const active = THEME.BLUE_400
const inactive = THEME.GRAY_300

const getBackgroundColor = (progress) => (
    `linear-gradient(90deg, ${active} 0% ${progress}%, ${inactive} ${progress}% 100%)`
)

function AppRangeStepInput(
    {
        value,
        setValue,
        min = 0,
        max = 100,
        step = 1,
        formatValue = (v) => v,
        ...props
    }) {

    const [style, setStyle] = useState({
        background: getBackgroundColor((value / max) * 100),
    })

    const onChange = (event) => {
        const val = event.target.value
        const progress = (val / max) * 100
        const bc = getBackgroundColor(progress);
        setStyle({...style, background: bc});
        setValue(val)
    }

    return <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
        <div className={styles.borderValueDiv}>
            <p className={styles.borderValue}>
                {formatValue(min)}
            </p>
        </div>
        <div className={styles.valueDiv}>
            <p>
                {formatValue(value)}
            </p>
        </div>
            <div className={styles.borderValueDiv}>
                <p className={styles.borderValue}>
                    {formatValue(max)}
                </p>
            </div>
        </div>
        <div className={styles.inputWrapper}>
            <input type="range"
                   min={min}
                   max={max}
                   value={value}
                   onChange={e => onChange(e)}
                   style={style}
                   className={styles.main}
                   step={step}
            />
        </div>
    </div>
}


export default AppRangeStepInput;