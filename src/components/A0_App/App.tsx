import React, {useEffect} from 'react';
import style from "./app.module.scss"
import {Header} from "../A1_Header/Header";
import {Route, Routes} from "react-router-dom";
import {routes} from "./routes";
import {ProductPage} from "../B3_ProductPage/ProductPage";
import {InfoPopup} from "../X_Common/InfoPopup/InfoPopup";
import {ErrorModal} from "../X_Common/ErrorModal/ErrorModal";
import {RegistrationPage} from "../A2_RegistrationPage/RegistrationPage";
import {LoginPage} from "../A3_LoginPage/LoginPage";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {getUserInfo} from "../../localStorage/localStorage";
import {BurgerMenu} from "../A4_BurgerMenu/BurgerMenu";


export const App = observer(() => {
    const {authStore: {setAuth}} = useStore();

    useEffect(() => {
        const userInfo = getUserInfo();
        if (userInfo) {
            setAuth(true)
        }
    }, [])

    return (
        <div className={style.app}>
            <Header/>
            <InfoPopup/>
            <ErrorModal/>
            <BurgerMenu/>

            <main className={style.main}>
                <div className={style.inner}>
                    <Routes>
                        {
                            routes.map(({path, element}, index) => (
                                <Route key={index} path={path} element={element}/>
                            ))
                        }
                        <Route path="read/:id" element={<ProductPage/>}/>
                        <Route path="registration" element={<RegistrationPage/>}/>
                        <Route path="login" element={<LoginPage/>}/>
                    </Routes>
                </div>

            </main>
        </div>
    );
})
