import React from "react";
import {LinearPreloader} from "../X_Common/LinearPreloader/LinearPreloader";
import style from "./RefetchingPage.module.scss";
import {Link} from "react-router-dom";
import {NetworkStatus, useQuery} from "@apollo/client";
import {IProduct} from "../../types/product.type";
import {GET_PRODUCT_BY_ID, GET_PRODUCTS} from "../../api/api";
import {Button} from "@mui/material";

export const RefetchingPage = () => {
    const {loading, error, data, refetch, networkStatus} = useQuery<{product: IProduct}, {id: string}>(
        GET_PRODUCT_BY_ID,
        {
            variables: {id: "1"},
            notifyOnNetworkStatusChange: true,
        }
    );

    return (
        <div className={style.refetchingPage}>
            {(loading || networkStatus === NetworkStatus.refetch) && !error && <LinearPreloader/>}

            <h1 className={style.title}>Refetching (with other variable)</h1>

            {
                data && (
                    <>
                        <div className={style.product}>
                            <p><span>name:</span> {data.product.name}</p>
                            <p><span>count:</span> {data.product.count}</p>
                            <p><span>color:</span> {data.product.color}</p>
                        </div>

                        <Button variant="outlined"
                                color="success"
                                className={style.btn}
                                onClick={() => refetch({id: "2"})}
                        >
                            refetch
                        </Button>
                    </>
                )
            }



        </div>
    )
}
