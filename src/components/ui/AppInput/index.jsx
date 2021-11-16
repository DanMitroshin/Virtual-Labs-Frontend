import React, {useState} from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

function AppInput(
    {
        label= "",
        placeholder = "",
        value = "",
        setValue = () => {},
        onChangeValue = undefined,
        onFocus = () => {},
        onBlur = () => {},
        maxLength = 60,
        error = "",
        type = "text",
        editable = true,
        ...props}) {
    // const onChange = editable ? setValue : (e) => {}
    const onChange = (v) => {
        if (!editable) {
            return;
        }
        if (typeof onChangeValue === 'function') {
            onChangeValue()
        }
        setValue(v)
    }

    const [active, setActive] = useState(false);

    return <div className={cn(styles.field_input,
        active && editable ? styles.active : styles.inactive,
        !editable && styles.not_editable, error && styles.error
    )}>
        <label className={cn(styles.label,
            active && editable ? styles.active : styles.inactive,
            !editable && styles.not_editable, error && styles.error)}>
            {label}
        </label>
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
            {error}
        </label>
    </div>;
}


export default AppInput;
