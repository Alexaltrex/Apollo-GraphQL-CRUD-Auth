import React from "react";
import style from './LoginPage.module.scss';
import {FormikErrors, FormikHelpers, useFormik} from "formik";
import {Button, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import styled from "@mui/material/styles/styled";
import {ILoginValues, LoginDataType} from "../../types/auth.type";
import {setUserInfo} from "../../localStorage/localStorage";
import {ApolloError, useMutation} from "@apollo/client";
import {LOGIN_USER, REGISTER_USER} from "../../api/api";
import {useStore} from "../../store/useStore";
import {observer} from "mobx-react-lite";

const StyledTextField = styled(TextField)({
    '& p.MuiFormHelperText-root': {
        position: 'absolute',
        left: 0,
        bottom: 0,
        transform: 'translateY(100%)'
    }
});

export const LoginPage = observer(() => {
    const {appStore: {setInfoPopup}, authStore: {setAuth}} = useStore();

    const [login, {data, loading, error}] = useMutation<{login: LoginDataType }>(
        LOGIN_USER, {
            onError: (error: ApolloError) => {},
            onCompleted: (data) => {
                //console.log(data.login.login)
                setInfoPopup({open: true, severity: "success", text: `User login`})
                setUserInfo(data.login);
                setAuth(true);
                navigate('/');
            }
        }
    )


    const initialValues: ILoginValues = {
        email: '',
        password: '',
    };

    const navigate = useNavigate();

    const onSubmit = async (values: ILoginValues, formikHelpers: FormikHelpers<ILoginValues>) => {
        try {
            //const response = await authAPI.login(email, password);
            await login({
                variables: {
                    loginData: values
                }
            })
        } catch (e: any) {
            //formikHelpers.setErrors({email: '  ', password: e.response.data.message});
        } finally {
            formikHelpers.setSubmitting(false);
        }
    };

    const validate = (values: ILoginValues): FormikErrors<ILoginValues> => {
        const errors: FormikErrors<ILoginValues> = {};
        if (!values.email) {
            errors.email = "required"
        }
        if (!values.password) {
            errors.password = "required"
        }
        return errors;
    };

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit
    });

    return (
        <div className={style.loginPage}>
            <form onSubmit={formik.handleSubmit}
                  className={style.form}
            >
                <Typography variant='h4' align='center'>
                    Login
                </Typography>

                <StyledTextField type="text"
                                 fullWidth
                                 variant="outlined"
                                 id="email"
                                 label="email"
                                 value={formik.values.email}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 error={formik.touched.email && Boolean(formik.errors.email)}
                                 helperText={formik.touched.email && formik.errors.email}
                                 className={style.field}
                />
                <StyledTextField type="password"
                                 fullWidth
                                 variant="outlined"
                                 id="password"
                                 label="password"
                                 value={formik.values.password}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 error={formik.touched.password && Boolean(formik.errors.password)}
                                 helperText={formik.touched.password && formik.errors.password}
                                 className={style.field}
                />
                <Button type='submit'
                        color="primary"
                        fullWidth
                        variant="contained"
                        className={style.field}
                >
                    Submit
                </Button>
            </form>

        </div>
    )
});
