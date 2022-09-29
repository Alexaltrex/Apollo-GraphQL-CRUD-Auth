import style from "./Header.module.scss"
import React from "react";
import {Link} from "react-router-dom";
import {linksAuth, linksNotAuth} from "../A0_App/routes";
import {svgIcons} from "../../assets/svgIcons";
import {Auth} from "./Auth/Auth";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import clsx from "clsx";
import {IconButton} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

export const Header = observer(() => {
    const {authStore: {auth}, appStore: {burgerMenu, setBurgerMenu}} = useStore();

    return (
        <header className={style.header}>
            <div className={style.inner}>
                <Link to="/"
                      className={style.logo}
                >
                    {svgIcons.graphql}
                    {svgIcons.apollo}

                    <p>CRUD + Auth</p>

                </Link>

                <div className={style.right}>
                    <div className={style.links}>
                        {
                            (auth ? linksAuth : linksNotAuth).map(({label, to, crud}, index) => (
                                <Link key={index}
                                      className={clsx({
                                          [style.link]: true,
                                          [style.link_crud]: crud,
                                      })}
                                      to={to}
                                >
                                    <span>{label[0]}</span>{label.slice(1)}
                                </Link>
                            ))
                        }
                    </div>
                    <Auth/>
                    <IconButton className={style.burgerBtn}
                                onClick={() => setBurgerMenu(!burgerMenu)}
                    >
                        {burgerMenu ? <MenuOpenIcon sx={{color: "#FFF"}}/> : <MenuIcon sx={{color: "#FFF"}}/>}
                    </IconButton>
                </div>

            </div>

        </header>
    )
})
