import {createClient} from "graphql-ws";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {getUserInfo} from "../../../localStorage/localStorage";

export const wsLink = new GraphQLWsLink(createClient({
    lazy: true, // соединение происходит не немедленно, а при первой подписке
    url: process.env.NODE_ENV === "development"
        ? 'ws://localhost:4567/graphql'
        : "wss://graphql-crud-auth.herokuapp.com/graphql",
    connectionParams: {
        token: getUserInfo() ? getUserInfo()?.token : null
    }
}));
