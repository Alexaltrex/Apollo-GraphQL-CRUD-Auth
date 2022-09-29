import React, {FC} from "react";
import style from "./ErrorModal.module.scss";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import UndoIcon from '@mui/icons-material/Undo';
import CachedIcon from '@mui/icons-material/Cached';
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import clsx from "clsx";

export const ErrorModal = observer(() => {
    const {appStore: {
        showErrorModal, setShowErrorModal,
        errorMessage, setErrorMessage,
    }} = useStore();

    const navigate = useNavigate();

    return (
        <div className={clsx({
            [style.errorModal]: true,
            [style.errorModal_show]: showErrorModal,
        })}>

            <div className={style.titleBlock}>
                <ErrorOutlineIcon className={style.icon}/>
                <h1>Error</h1>
            </div>

            <p className={style.message}>{errorMessage}</p>

            <Button onClick={() => {
                navigate("/");
                setShowErrorModal(false);
            }}
                    variant="contained"
                    color='inherit'
                    className={style.btn}
                    startIcon={<HomeIcon/>}
            >
                Go to the home page
            </Button>

            <Button onClick={() => {
                navigate(-1);
                setShowErrorModal(false);
            }}
                    variant="contained"
                    color='inherit'
                    className={style.btn}
                    startIcon={<UndoIcon/>}
            >
                Go to the previous page
            </Button>

            <Button onClick={() => {
                window.location.reload();
                setShowErrorModal(false);
            }}
                    variant="contained"
                    color='inherit'
                    className={style.btn}
                    startIcon={<CachedIcon/>}
            >
                Reload page
            </Button>

        </div>
    )
})