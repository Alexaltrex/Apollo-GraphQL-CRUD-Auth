import {AlertColor} from "@mui/material";

export interface IInfoPopup {
    open: boolean
    severity: AlertColor
    text: string
}