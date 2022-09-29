import {gql} from "@apollo/client";

export const GET_PRODUCTS = gql`
    query GetProducts {
        products {
            id
            name
            count
            color
            categoryId
        }
    }
`

export const GET_PRODUCT_BY_ID  = gql`
    query GetProductById($id: ID!) {
        product(id: $id) {
            id
            name
            color
            count
        }
    }
`

export const CREATE_PRODUCT = gql`
    mutation CreateProduct($createProductData: CreateProduct!) {
        createProduct(createProductData: $createProductData) {
            name
            categoryId
        }
    }
`

export const UPDATE_PRODUCT = gql`
    mutation UpdateProduct($updateProductData: UpdateProduct!) {
        updateProduct(updateProductData: $updateProductData) {
            name 
            categoryId
        }
    }
`

export const DELETE_PRODUCT = gql`
    mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id) {
            name
            categoryId
        }
    }
`

export const REGISTER_USER = gql`
    mutation Registration($registrationData: RegistrationData!) {
        registration(registrationData: $registrationData) {
            message
        }
    }
`

export const LOGIN_USER = gql`
    mutation Login($loginData: LoginData!) {
        login(loginData: $loginData) {
            token
            id
            login
            email
        }
    }
`

export const GET_MESSAGES = gql`
    query GetMessages {
        messages {
            id
            text
            author
        }
    }
`

export const ADD_MESSAGE = gql`
    mutation AddMessage($addMessageData: AddMessageData!) {
        addMessage(addMessageData: $addMessageData) {
            id
            text
            author
        }
    }
`

export const MESSAGE_SUBSCRIPTION = gql`
    subscription OnMessageAdded {
        messageCreated {
            id
            text
        }
    }  
`

export const GET_CATEGORY_LIST = gql`
    query GetCategoriesAndProducts {
        categories {
            id
            name            
        }
    }
`

export const GET_PRODUCTS_OF_CATEGORY = gql`
    query GetProductsOfCategory($id: ID!) {
        category(id: $id) {
            id
            name
            products {
                id
                name
                color
                count
            }
        }
    }
`
