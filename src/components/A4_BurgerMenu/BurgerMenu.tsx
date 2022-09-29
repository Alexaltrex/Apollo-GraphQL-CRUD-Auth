import React from "react";
import style from "./BurgerMenu.module.scss";
import clsx from "clsx";
import {useStore} from "../../store/useStore";
import {observer} from "mobx-react-lite";
import {IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {homeLinksAuth, homeLinksNotAuth} from "../A0_App/routes";
import {Link} from "react-router-dom";

export const BurgerMenu = observer(() => {
    const {
        appStore: {burgerMenu, setBurgerMenu},
        authStore: {auth}
    } = useStore()

    return (
        <div className={clsx({
            [style.burgerMenu]: true,
            [style.burgerMenu_open]: burgerMenu,
        })}>
            <IconButton className={style.closeBtn}
                        onClick={() => setBurgerMenu(false)}
            >
                <CloseIcon sx={{color: "royalblue"}}/>
            </IconButton>
            <div className={style.links}>
                {
                    (auth ? homeLinksAuth : homeLinksNotAuth).map(({label, to, crud}, index) => (
                        <Link key={index}
                              to={to}
                              className={clsx({
                                  [style.link]: true,
                                  [style.link_crud]: crud,
                              })}
                              onClick={() => setBurgerMenu(false)}
                        >
                            <span>{label[0]}</span>{label.slice(1)}
                        </Link>
                    ))
                }
            </div>
        </div>
    )
})
