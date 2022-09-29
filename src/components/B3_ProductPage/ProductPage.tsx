import React from "react";
import style from "./ProductPage.module.scss"
import {useQuery} from "@apollo/client";
import {Link, useParams} from "react-router-dom";
import {GET_PRODUCTS_OF_CATEGORY} from "../../api/api";
import {observer} from "mobx-react-lite";
import {LinearPreloader} from "../X_Common/LinearPreloader/LinearPreloader";
import {ICategory} from "../../types/category.type";
import {ProductCard} from "../X_Common/ProductCard/ProductCard";

export const ProductPage = observer(() => {
    const {id} = useParams<{ id: string }>();

    const {loading, error, data} = useQuery<{ category: ICategory }>(
        GET_PRODUCTS_OF_CATEGORY,
        {
            variables: {id}
        }
    );

    return (

        <div className={style.productPage}>

            {(loading) && !error && <LinearPreloader/>}

            <h1 className={style.title}>Read - Products of category</h1>

            {
                data && (
                    <>
                        <div className={style.navigator}>
                            <Link to="/read">Category</Link>
                            <span> / {data.category.name}</span>
                        </div>

                        <div className={style.list}>
                            {
                                data.category.products.map(product => (
                                    <ProductCard key={product.id} {...product}/>
                                ))
                            }
                        </div>
                    </>
                )
            }
        </div>
    )
})
