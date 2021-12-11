import React, {useEffect, useState} from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import AppInput from "../AppInput";


function ArrayAppInput(
    {
        label= "",
        value = [],
        setValue = () => {},
        maxAmount = undefined,
        onChangeValue = undefined,
        error = "",
        editable = true,
        ...props}) {

    const [error_, setError] = useState(error)

    useEffect(() => {
        setError(error)
    }, [error])

    const onAddItem = (index) => {
        const firstValues = value.slice(0, index + 1)
        const lastValues = value.slice(index + 1)

        const firstErrors = error.slice(0, index + 1)
        const lastErrors = error.slice(index + 1)

        setValue([...firstValues, "", ...lastValues], {error: [...firstErrors, "", ...lastErrors]})
    }

    const onRemoveItem = (index) => {
        if (value.length <= 1) {
            return
        }
        const firstValues = value.slice(0, index)
        const lastValues = value.slice(index + 1)

        const firstErrors = error.slice(0, index)
        const lastErrors = error.slice(index + 1)

        setValue([...firstValues, ...lastValues], {error: [...firstErrors, ...lastErrors]})
    }

    const onChange = (val, info, index) => {
        if (!editable) {
            return;
        }
        if (typeof onChangeValue === 'function') {
            onChangeValue()
        }
        value[index] = val
        let err = [...error]
        err[index] = info.error

        // let errors = value.map((_, index))
        setValue([...value], {error: err})
    }

    return <div className={styles.container}>
        <h4 className={styles.title}>
            {label}
        </h4>
        {/*{error_.length > 0 && <p className={cn(styles.title, styles.error)}>*/}
        {/*    {error_}*/}
        {/*</p>}*/}
        {value.map((item, index) => (
            <div key={index.toString()}
                 className={styles.inputWrapper}>
                <div
                    onClick={() => onAddItem(index)}
                    className={cn(styles.arrayButton, styles.addButton)}>
                    +
                </div>
                <div
                    onClick={() => onRemoveItem(index)}
                    className={cn(styles.arrayButton, styles.removeButton)}>
                    X
                </div>
            <AppInput
                value={item}
                error={error_[index]}
                editable={editable}
                label={`${label} №${index + 1}`}
                setValue={(val, info) => onChange(val, info, index)}
                {...props}
            />
            </div>
        ))}
    </div>;
}


export default ArrayAppInput;
