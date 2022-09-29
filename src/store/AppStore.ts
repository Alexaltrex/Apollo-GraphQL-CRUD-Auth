import {action, makeObservable, observable} from "mobx";
import {IInfoPopup} from "../types/app.type";

export class AppStore {
    burgerMenu: boolean = false
    infoPopup: IInfoPopup = {
        open: false,
        severity: "error", // "success"
        text: ""
    }
    showErrorModal = false
    errorMessage = ""

    constructor() {
        makeObservable(this,
            {
                burgerMenu: observable,
                infoPopup: observable,
                showErrorModal: observable,
                errorMessage: observable,
                setBurgerMenu: action.bound,
                setInfoPopup: action.bound,
                setShowErrorModal: action.bound,
                setErrorMessage: action.bound,
            }
        )
    }

    setBurgerMenu(burgerMenu: boolean) {
        this.burgerMenu = burgerMenu;
    }

    setInfoPopup(infoPopup: IInfoPopup) {
        this.infoPopup = infoPopup
    }

    setShowErrorModal(showErrorModal: boolean) {
        this.showErrorModal = showErrorModal
    }

    setErrorMessage(errorMessage: string) {
        this.errorMessage = errorMessage
    }
}
