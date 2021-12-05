import React from "react";
import styles from './styles.module.scss';

import cn from 'classnames';

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

    return <div className={styles.wrapper}>
        {/*<InputRange*/}
        {/*    onChange={setValue}*/}
        {/*    onChangeComplete={() => {}}*/}
        {/*    step={step}*/}
        {/*    value={value}*/}
        {/*    minValue={min}*/}
        {/*    maxValue={max}*/}
        {/*    classNames={{activeTrack: styles.main}}*/}
        {/*/>*/}
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
                   onChange={e => setValue(e.target.value)}
                   className={styles.main}
                   step={step}
            />
        </div>
    </div>
}


export default AppRangeStepInput;
