import FormLabel from "@mui/material/FormLabel";
import {FormControl, FormControlProps} from "@mui/material";
import React, {FC} from "react";

interface IFieldsetCustom extends FormControlProps {
    label?: string
    className?: any
    error?: boolean
}

export const FieldsetCustom: FC<IFieldsetCustom> = ({label, className, children, error = false}) => {
    return (
        <FormControl component="fieldset"
                     className={className ? className : undefined}
                     sx={{
                         border: error ? "1px solid red" : "1px solid rgba(0, 0, 0, 0.23)",
                         borderRadius: "4px",
                         padding: "0px 10px 10px",
                         maxWidth: "100%",
                     }}
        >
            {label && <FormLabel component="legend"
                                 sx={{
                                     fontSize: "12px",
                                     padding: "0px 5px",
                                     color: error ? "red" : 'default'
                                 }}
            >
                {label}
            </FormLabel>}
            {children}
        </FormControl>
    )
};