import {HttpLink} from "@apollo/client";

export const httpLink = new HttpLink({
    uri: process.env.NODE_ENV === "development" ? "http://localhost:4567/graphql" : 'https://graphql-crud-auth.herokuapp.com/graphql',

    // credentials: "same-origin" - (по умолчанию), учетные данные добавляются в запрос если сервер расположен в том же источнике, что и клиент
    // credentials: "omit" - учетные данные никогда не отсылаются
    // credentials: "include" - учетные данные всегда отсылаются, даже для запросов на другой источник
    credentials: "include",
    headers: {
        //authorization: localStorage.getItem('token'),
        //"client-name": "alexaltrex"
    }
});
