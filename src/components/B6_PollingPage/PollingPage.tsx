import React, {useEffect} from "react";
import {LinearPreloader} from "../X_Common/LinearPreloader/LinearPreloader";
import style from "./PollingPage.module.scss";
import {Link} from "react-router-dom";
import {NetworkStatus, useQuery} from "@apollo/client";
import {IProduct} from "../../types/product.type";
import {GET_PRODUCTS} from "../../api/api";
import {Button} from "@mui/material";

export const PollingPage = () => {
    const {loading, error, data, startPolling, stopPolling, networkStatus} = useQuery<{ products: IProduct[] }>(
        GET_PRODUCTS,
        {
            notifyOnNetworkStatusChange: true,
        }
    );

    useEffect(() => {
        startPolling(1000)
    }, [])

    return (
        <div className={style.pollingPage}>
            {(loading || networkStatus === NetworkStatus.poll) && !error && <LinearPreloader/>}

            <h1 className={style.title}>Polling - Products list</h1>

            {
                data && (
                    <div className={style.products}>
                        {
                            data.products.map(({id, name, color, count}) => (
                                <Link key={id}
                                      to={`/read/${id}`}
                                      className={style.link}
                                >
                                    {name}
                                </Link>
                            ))
                        }
                    </div>
                )
            }

            <Button variant="outlined"
                    color="success"
                    className={style.btn}
                    onClick={() => startPolling(1000)}>
                Start polling
            </Button>

            <Button variant="outlined"
                    color="error"
                    className={style.btn}
                    onClick={() => stopPolling()}
            >
                Stop polling
            </Button>

        </div>
    )
}
