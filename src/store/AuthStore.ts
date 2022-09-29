import {action, makeObservable, observable} from "mobx";

export class AuthStore {
    auth: boolean = false
    // email: string | null = null
    // login: string | null = null

    constructor() {
        makeObservable(this,
            {
                auth: observable,
                setAuth: action.bound,
            }
        )
    }

    setAuth(auth: boolean) {
        this.auth = auth
    }
}
