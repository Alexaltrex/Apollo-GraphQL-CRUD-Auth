import React from "react";
import style from "./Auth.module.scss";
import {Button} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
//import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import green from "@mui/material/colors/green";
import red from "@mui/material/colors/red";
import Typography from "@mui/material/Typography";
import {getUserInfo, removeUserInfo} from "../../../localStorage/localStorage";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {useNavigate} from "react-router-dom";
import {client} from "../../A0_App/AppContainer";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";

const sxListItemIcon = {minWidth: 0, marginRight: "10px"};

export const Auth = observer(() => {
    const {authStore: {setAuth}} = useStore();

    const navigate = useNavigate();

    const userInfo = getUserInfo();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const onOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onClosePopover = () => setAnchorEl(null);

    const onLoginOpenHandler = () => {
        setAnchorEl(null);
        navigate('/login');
    };

    const onRegisterOpenHandler = () => {
        navigate('/registration');
        setAnchorEl(null);
    };

    const onLogoutHandler = async () => {
        removeUserInfo();
        setAuth(false);
        setAnchorEl(null);
        //navigate('/');
        await client.clearStore();
    };

    return (
        <div className={style.auth}>

            <Button sx={{color: 'white', textTransform: 'none'}}
                    startIcon={<AccountCircleIcon fontSize='large' sx={{ color: userInfo ? green[500] : red[500] }}/>}
                    endIcon={<ExpandMoreIcon/>}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={onOpenPopover}
            >
                {
                    userInfo &&
                    <Typography color='common.white'>
                        {userInfo.login}
                    </Typography>
                }
            </Button>

            <Popover
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={onClosePopover}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <List sx={{padding: 0}}>
                    {
                        !userInfo &&
                        <ListItem onClick={onLoginOpenHandler}
                                  button
                        >
                            <ListItemIcon sx={sxListItemIcon}>
                                <ExitToAppIcon sx={{color: green[500]}}/>
                            </ListItemIcon>
                            <ListItemText primary="Login"/>
                        </ListItem>
                    }

                    {
                        !userInfo &&
                        <ListItem onClick={onRegisterOpenHandler}
                                  button
                        >
                            <ListItemIcon sx={sxListItemIcon}>
                                <AccountCircleIcon sx={{color: green[500]}}/>
                            </ListItemIcon>
                            <ListItemText primary="Registration"/>
                        </ListItem>
                    }

                    {/*{*/}
                    {/*    userInfo &&*/}
                    {/*    <ListItem //onClick={onSettingHandler}*/}
                    {/*              button*/}
                    {/*    >*/}
                    {/*        <ListItemIcon sx={sxListItemIcon}>*/}
                    {/*            <ManageAccountsIcon/>*/}
                    {/*        </ListItemIcon>*/}
                    {/*        <ListItemText primary="Account settings"/>*/}
                    {/*    </ListItem>*/}
                    {/*}*/}

                    {
                        userInfo &&
                        <ListItem onClick={onLogoutHandler}
                                  button
                        >
                            <ListItemIcon sx={sxListItemIcon}>
                                <ExitToAppIcon sx={{ color: red[500] }}/>
                            </ListItemIcon>
                            <ListItemText primary="Logout"/>
                        </ListItem>
                    }
                </List>
            </Popover>
        </div>
    )
})
