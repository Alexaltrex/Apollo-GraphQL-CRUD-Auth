export type LoginDataType = {
    token: string
    login: string
    id: string
    email: string
}

export interface IRegistrationValues {
    login: string
    email: string
    password: string
}

export interface ILoginValues {
    email: string
    password: string
}
