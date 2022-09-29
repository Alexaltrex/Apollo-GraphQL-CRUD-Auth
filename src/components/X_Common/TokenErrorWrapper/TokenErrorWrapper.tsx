import React, {FC} from "react";
import {ApolloError} from "@apollo/client";
import {Navigate} from "react-router-dom";

interface IErrorWrapper {
    error: ApolloError | undefined
    children: any
}

export const TokenErrorWrapper: FC<IErrorWrapper> = ({
                                                    error,
                                                    children
                                                }) => {
    return (
        <>
            {
                (error && error.message === "jwt expired") ? (
                    <Navigate to="/login"/>
                ) : (
                    <>
                        {children}
                    </>
                )
            }
        </>
    )
}
