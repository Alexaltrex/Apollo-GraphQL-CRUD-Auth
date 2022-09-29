import {LoginDataType} from "../types/auth.type";

const keyName = 'apolloGraphQLUserInfo'

export const setUserInfo = (userInfo: LoginDataType) => {
    localStorage.setItem(keyName, JSON.stringify(userInfo));
};

export const getUserInfo = (): null | LoginDataType => {
    const userInfo = localStorage.getItem(keyName);
    //console.log(userInfo)
    if (userInfo) {
        const data = JSON.parse(userInfo);
        return ({...data})
    } else {
        return null
    }
};

export const removeUserInfo = () => {
    localStorage.removeItem(keyName);
};
