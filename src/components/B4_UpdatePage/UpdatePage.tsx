import style from "./UpdatePage.module.scss"
import React from "react";
import {useQuery} from "@apollo/client";
import {IProduct} from "../../types/product.type";
import {GET_PRODUCTS} from "../../api/api";
import {UpdateProductItem} from "./UpdateProductItem/UpdateProductItem";
import {LinearPreloader} from "../X_Common/LinearPreloader/LinearPreloader";
import {Navigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {getUserInfo} from "../../localStorage/localStorage";

export const UpdatePage = observer(() => {
    const {authStore: {auth}} = useStore();

    const {loading, error, data} = useQuery<{ products: IProduct[] }>(GET_PRODUCTS);

    const userInfo = getUserInfo();

    if (!auth && !userInfo) {
        return (
            <Navigate to="/"/>
        )
    }

    return (
        <div className={style.updatePage}>

            {loading && !error && <LinearPreloader/>}

            <h1 className={style.title}>Update product</h1>

            {
                data && (
                    <div className={style.items}>
                        {
                            data.products.map(product => (
                                <UpdateProductItem key={product.id} {...product}/>
                            ))
                        }
                    </div>
                )
            }

        </div>
    )
})
