import {Snackbar} from "@mui/material";
import Alert from "@mui/material/Alert";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";

export const InfoPopup = observer(() => {
    const {appStore: {infoPopup, setInfoPopup}} = useStore();

    const onCloseHandler = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setInfoPopup({open: false, severity: infoPopup.severity, text: infoPopup.text})
    }

    return (
        <Snackbar
            open={infoPopup.open}
            autoHideDuration={3000}
            onClose={onCloseHandler}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}

        >
            <Alert
                onClose={onCloseHandler}
                severity={infoPopup.severity}
                sx={{width: '100%'}}
            >
                {infoPopup.text}
            </Alert>
        </Snackbar>
    )
})