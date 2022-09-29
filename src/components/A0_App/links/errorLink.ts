import {onError} from "@apollo/client/link/error";
import {mutationOperations, queryOperations, subscriptionOperations} from "../../../constants/constants";
import {store} from "../../../store/RootStore";

export const errorLink = onError(({graphQLErrors, networkError, operation}) => {
    if (process.env.NODE_ENV === "development") {
        if (graphQLErrors) {
            graphQLErrors.forEach(({message, locations, path}) => {
                    console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
                }
            );
        }
        if (networkError) {
            console.log(`[Network error]: ${networkError}`);
        }
    }

    const {operationName} = operation;
    //console.log(operationName)

    // const navigate = useNavigate();
    // if (graphQLErrors && graphQLErrors[0].message === "jwt expired") {
    //     navigate("/login")
    // }

    if ((graphQLErrors || networkError)) {
        let text = "";
        if (graphQLErrors) {
            text = `[GraphQL error]: ${graphQLErrors[0].message}`
        }
        if (graphQLErrors && graphQLErrors[0].message === "jwt expired") {
            text = "Jwt expired, please login again"
        }
        if (networkError) {
            text = `[Network error]: ${networkError.message}`
        }

        // для QUERY запросов - показываем ErrorModal
        if (queryOperations.includes(operationName)) {
            store.appStore.setShowErrorModal(true);
            store.appStore.setErrorMessage(text)
        }

        // для MUTATION и SUBSCRIPTION запросов - показываем InfoPopup
        if ( mutationOperations.includes(operationName) ||
            subscriptionOperations.includes(operationName)
        ) {
            store.appStore.setInfoPopup({open: true, severity: "error", text})
        }
    }
});
