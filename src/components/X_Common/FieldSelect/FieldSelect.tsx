import {useField} from "formik";
import React, {FC} from "react";
import {SelectProps} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import clsx from "clsx";

export interface IMenuItem {
    value: string
    label: string
}

type FieldSelectType = {
    name: string
    menuItems: Array<IMenuItem>
    className?: string
} & SelectProps;

export const FieldSelect: FC<FieldSelectType> = ({ name, menuItems, className, ...props }) => {
    const [ field, meta, helper ] = useField(name);
    const menuItemsElements = menuItems.map(el => <MenuItem key={el.value} value={el.value}>{el.label}</MenuItem>);

    return (
        <div className={clsx(Boolean(className) && className)}>
            <FormControl variant='outlined'
                         fullWidth={true}
                         size='small'
                         error={meta.touched && Boolean(meta.error)}
            >
                <InputLabel id={name}>{props.label}</InputLabel>
                <Select
                    name={field.name}
                    label={props.label}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    error={meta.touched && Boolean(meta.error)}
                >
                    {menuItemsElements}
                </Select>
                <FormHelperText>
                    {meta.touched && meta.error}
                </FormHelperText>
            </FormControl>
        </div>
    )
};
