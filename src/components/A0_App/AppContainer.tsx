import React, {createContext} from "react";
import {App} from "./App";
import {HashRouter} from "react-router-dom";
import {ApolloClient, ApolloProvider, from, InMemoryCache, split} from "@apollo/client";
import {RootStore, store} from "../../store/RootStore";
import {errorLink} from "./links/errorLink";
import { httpLink } from "./links/httpLink";
import {authLink} from "./links/authLink";
import {getMainDefinition} from "@apollo/client/utilities";
import {wsLink} from "./links/wsLink";

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    from([errorLink, wsLink]),
    from([
        authLink,
        errorLink,
        httpLink
    ]),
);

export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});

export const StoreContext = createContext<RootStore>({} as RootStore)

export const AppContainer = () => {
    return (
        <StoreContext.Provider value={store}>
            <HashRouter>
                <ApolloProvider client={client}>
                    <App/>
                </ApolloProvider>
            </HashRouter>
        </StoreContext.Provider>
    )
}
