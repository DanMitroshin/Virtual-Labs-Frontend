import React, {useEffect, useState} from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

const CheckNumber = (number, from, to) => {
    let num = Number(number)
    // console.log("NUM", num, isNaN(num))
    if (isNaN(num)) {
        return "Должно быть числом"
    } else {
        if (typeof from !== 'undefined' && num < from) {
            return `Должно быть не менее ${from}`
        }
        if (typeof to !== 'undefined' && num > to) {
            return `Должно быть не более ${to}`
        }
    }
    return ""
}

const INPUT_TYPES = {
    NUMBER: "number",
    TEXT: 'text',
}

function AppInput(
    {
        label= "",
        placeholder = "",
        value = "",
        setValue = () => {},
        from = undefined,
        to = undefined,
        onChangeValue = undefined,
        onFocus = () => {},
        onBlur = () => {},
        maxLength = 60,
        error = "",
        type = "text",
        editable = true,
        ...props}) {
    // const onChange = editable ? setValue : (e) => {}

    const [error_, setError] = useState(error)

    useEffect(() => {
        setError(error)
    }, [error])

    const onChange = (v) => {
        if (!editable) {
            return;
        }
        if (typeof onChangeValue === 'function') {
            onChangeValue()
        }
        let err = ""
        if (type === INPUT_TYPES.NUMBER) {
            err = CheckNumber(v, from, to)
        } else if (type === INPUT_TYPES.TEXT) {
            err = ""
        }
        // console.log("NEW ERR", type, err)
        setError(err)
        setValue(v, {error: err})
    }

    const [active, setActive] = useState(false);

    return <div className={styles.container}>
        <label className={cn(styles.label,
            active && editable ? styles.active : styles.inactive,
            !editable && styles.not_editable, error_ && styles.error)}>
            {label}
        </label>
        <div className={cn(styles.field_input,
        active && editable ? styles.active : styles.inactive,
        !editable && styles.not_editable, error && styles.error
    )}>
        <input className={cn(styles.input, !editable && styles.not_editable)}
               value={value}
               placeholder={placeholder}
               maxLength={maxLength}
               type={type}
               contentEditable={"false"}
               onChange={ e => onChange(e.target.value)}
               onFocus={(e) => {
                   setActive(true)
                   onFocus(e)
                   // console.log(e)
               }}
               onBlur={(e) => {
                   setActive(false);
                   onBlur(e)
                   //console.log("ACTIVE", e)
               }}
               {...props}
        />
        <label className={cn(styles.labelError, styles.error)}>
            {error_}
        </label>
    </div>
    </div>;
}


export default AppInput;
