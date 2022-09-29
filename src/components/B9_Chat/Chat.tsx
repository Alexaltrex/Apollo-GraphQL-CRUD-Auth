import React, {useEffect} from "react";
import style from "./Chat.module.scss"
import {ApolloError, useMutation, useQuery, useSubscription} from "@apollo/client";
import {ADD_MESSAGE, GET_MESSAGES, MESSAGE_SUBSCRIPTION} from "../../api/api";
import {AddMessageErrorType, AddMessageType, IMessage} from "../../types/message.types";
import {LinearPreloader} from "../X_Common/LinearPreloader/LinearPreloader";
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {Navigate} from "react-router-dom";
import {getUserInfo} from "../../localStorage/localStorage";

export const Chat = observer(() => {
    const {authStore: {auth}} = useStore();

    const userInfo = getUserInfo();

    const {loading, error, data, refetch} = useQuery<{ messages: IMessage[] }>(GET_MESSAGES);

    const [addMessage, {data: addData, loading: addLoading, error: addError}] = useMutation(
        ADD_MESSAGE,
        {
            onError: (error: ApolloError) => {
            },
            onCompleted: (data) => {
            }
        }
    );

    const {data: dataSubscription, error: errorSubscription} = useSubscription(MESSAGE_SUBSCRIPTION, {
        context: {
            contextFromFront: "contextFromFront"
        }
    })

    useEffect(() => {
        console.log(dataSubscription);
        refetch();
    }, [dataSubscription])

    //AddMessageType
    const initialValues: AddMessageType = {
        text: ""

    }
    const validate = (values: AddMessageType) => {
        const error = {} as AddMessageErrorType
        if (!values.text) {
            error.text = "required"
        }
        return error
    }
    const onSubmit = async ({text}: AddMessageType) => {
        try {
            await addMessage({
                variables: {
                    addMessageData: {
                        text,
                    }
                }
            })
        } catch (e: any) {
            console.log(e) // не задействовано, обрабатывается через onError
        } finally {
            formik.resetForm()
        }
    }
    const formik = useFormik({
        initialValues,
        validate,
        onSubmit
    });

    if (!auth && !userInfo) {
        return (
            <Navigate to="/"/>
        )
    }

    return (
        <div className={style.chat}>

            {loading && !error && <LinearPreloader/>}

            <h1 className={style.title}>Chat (Subscriptions)</h1>

            {
                data && (
                    <>
                        <form onSubmit={formik.handleSubmit}
                              className={style.form}
                        >
                            <TextField
                                multiline
                                maxRows={4}
                                size="small"
                                fullWidth
                                id="text"
                                name="text"
                                label="Message"
                                value={formik.values.text}
                                onChange={formik.handleChange}
                                error={formik.touched.text && Boolean(formik.errors.text)}
                                helperText={formik.touched.text && formik.errors.text}
                            />
                            <Button color="primary"
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                    size="small"
                                    className={style.submitBtn}
                            >
                                Send message
                            </Button>
                        </form>

                        <div className={style.messages}>
                            {
                                data.messages.map(({id, text, author}) => (
                                    <p key={id} className={style.message}>
                                        <span>{author}</span>: <span>{text}</span>
                                    </p>
                                ))
                            }
                        </div>
                    </>

                )
            }

            {/*<Button variant="outlined"*/}
            {/*        className={style.btn}*/}
            {/*        onClick={async () => {*/}
            {/*            try {*/}
            {/*                await addMessage({*/}
            {/*                    variables: {*/}
            {/*                        addMessageData: {*/}
            {/*                            text: `Message: ${new Date()}`*/}
            {/*                        }*/}
            {/*                    }*/}
            {/*                })*/}
            {/*            } catch (e: any) {*/}
            {/*                console.log(e.message)*/}
            {/*            }*/}
            {/*        }}*/}
            {/*>*/}
            {/*    Add Message*/}
            {/*</Button>*/}

            {/*<Button variant="outlined"*/}
            {/*        className={style.btn}*/}
            {/*        onClick={() => refetch()}*/}
            {/*>*/}
            {/*    Refetch*/}
            {/*</Button>*/}

        </div>
    )
})
