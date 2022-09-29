import {LinearProgress} from "@mui/material";
import React from "react";
import style from "./LinearPreloader.module.scss";

export const LinearPreloader = () => {
    return (
        <LinearProgress className={style.LinearPreloader}
                        color='success'
        />
    )
}
