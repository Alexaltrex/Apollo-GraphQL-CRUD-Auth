import React from "react";
import { Link } from "react-router-dom";
import {homeLinksAuth, homeLinksNotAuth} from "../A0_App/routes";
import style from "./HomePage.module.scss";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import clsx from "clsx";

export const HomePage = observer(() => {
    const {authStore: {auth}} = useStore();

    return (
        <div className={style.homePage}>
            <div className={style.links}>
                {
                    (auth ? homeLinksAuth : homeLinksNotAuth).map(({label, to, crud}, index) => (
                        <Link key={index}
                              to={to}
                              className={clsx({
                                  [style.link]: true,
                                  [style.link_crud]: crud,
                              })}
                        >
                            <span>{label[0]}</span>{label.slice(1)}
                        </Link>
                    ))
                }
            </div>
        </div>
    )
})
