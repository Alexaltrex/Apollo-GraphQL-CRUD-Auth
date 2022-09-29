import {ApolloLink} from "@apollo/client";
import {authOperations} from "../../../constants/constants";
import {getUserInfo} from "../../../localStorage/localStorage";

export const authLink = new ApolloLink((operation, forward) => {
    const {operationName} = operation;

    // для операций, требующих аутентификации (здесь это мутации),
    // добавляем в хеадер заголовок с токеном
    if (authOperations.includes(operationName)) {
        const userInfo = getUserInfo();

        operation.setContext(({ headers = {} }) => ({
            headers: {
                ...headers,
                'x-access-token': userInfo ? userInfo.token : "",
            }
        }));
    }
    return forward(operation);
})
