import React from "react";
import {LinearPreloader} from "../X_Common/LinearPreloader/LinearPreloader";
import style from "./LazyPage.module.scss";
import {Link} from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import {IProduct} from "../../types/product.type";
import {GET_PRODUCTS} from "../../api/api";
import {Button} from "@mui/material";

export const LazyPage = () => {
    const [fetch, {loading, error, data}] = useLazyQuery<{ products: IProduct[] }>(
        GET_PRODUCTS
    );

    return (
        <div className={style.lazyPage}>
            {loading && !error && <LinearPreloader/>}

            <h1 className={style.title}>Lazy Query - Products list</h1>

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
                    onClick={() => fetch()}
            >
                fetch
            </Button>

        </div>
    )
}
