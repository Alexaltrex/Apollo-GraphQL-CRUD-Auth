import style from "./DeletePage.module.scss"
import React from "react";
import {ApolloError, useMutation, useQuery} from "@apollo/client";
import {IProduct} from "../../types/product.type";
import {DELETE_PRODUCT, GET_PRODUCTS, GET_PRODUCTS_OF_CATEGORY} from "../../api/api";
import {Button} from "@mui/material";
import {useStore} from "../../store/useStore";
import {observer} from "mobx-react-lite";
import {LinearPreloader} from "../X_Common/LinearPreloader/LinearPreloader";
import {Navigate} from "react-router-dom";
import {TokenErrorWrapper} from "../X_Common/TokenErrorWrapper/TokenErrorWrapper";
import {getUserInfo} from "../../localStorage/localStorage";

export const DeletePage = observer(() => {
    const {appStore: {setInfoPopup}, authStore: {auth}} = useStore();

    const {loading, error, data} = useQuery<{ products: IProduct[] }>(GET_PRODUCTS);

    const [
        deleteProduct,
        {
            loading: deleteLoading,
            error: deleteError
        }] = useMutation<{ deleteProduct: IProduct }>(DELETE_PRODUCT, {
        refetchQueries: (result) => {
            console.log(result)
            return [
                { query: GET_PRODUCTS },
                { query: GET_PRODUCTS_OF_CATEGORY, variables: {id: result?.data?.deleteProduct?.categoryId} }
            ]
        },
        onError: (error: ApolloError) => {
            //console.log(error)
        },
        onCompleted: (data) => {
            console.log(data)
            setInfoPopup({open: true, severity: "success", text: `${data.deleteProduct.name} is deleted`})
        }
    });

    const userInfo = getUserInfo();

    if (!auth && !userInfo) {
        return (
            <Navigate to="/"/>
        )
    }

    return (
        <TokenErrorWrapper error={deleteError}>
            <div className={style.deletePage}>

                {(loading || deleteLoading) && !error && !deleteError && <LinearPreloader/>}

                <h1 className={style.title}>Delete product (updating local data by refetching queries)</h1>

                {
                    data && (
                        <div className={style.list}>
                            {
                                data.products.map(({id, name}) => (
                                    <div key={id}
                                         className={style.item}
                                    >
                                        <p>{name}</p>
                                        <Button variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => {
                                                    deleteProduct({
                                                        variables: {id}
                                                    })
                                                }}
                                        >
                                            Delete product
                                        </Button>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </TokenErrorWrapper>

    )
})
