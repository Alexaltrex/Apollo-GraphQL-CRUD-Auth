import React, {FC} from "react";
import style from "./ErrorBlock.module.scss";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import UndoIcon from '@mui/icons-material/Undo';
import CachedIcon from '@mui/icons-material/Cached';
import {ApolloError} from "@apollo/client";

interface IErrorBlock {
    error: ApolloError
}

export const ErrorBlock:FC<IErrorBlock> = ({error}) => {
    const navigate = useNavigate();

    return (
        <div className={style.errorBlock}>

            <div className={style.titleBlock}>
                <ErrorOutlineIcon className={style.icon}/>
                <h1>Error</h1>
            </div>

            <p className={style.message}>{error.message}</p>

            <Button onClick={() => navigate("/")}
                    variant="contained"
                    color='inherit'
                    className={style.btn}
                    startIcon={<HomeIcon/>}
            >
                Go to the home page
            </Button>

            <Button onClick={() => navigate(-1)}
                    variant="contained"
                    color='inherit'
                    className={style.btn}
                    startIcon={<UndoIcon/>}
            >
                Go to the previous page
            </Button>

            <Button onClick={() => window.location.reload()}
                    variant="contained"
                    color='inherit'
                    className={style.btn}
                    startIcon={<CachedIcon/>}
            >
                Reload page
            </Button>

        </div>
    )
}