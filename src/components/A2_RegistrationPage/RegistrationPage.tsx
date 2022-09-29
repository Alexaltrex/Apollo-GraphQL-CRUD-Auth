import React from "react";
import style from './RegistrationPage.module.scss';
import {FormikErrors, FormikHelpers, useFormik} from "formik";
import {Button, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import styled from "@mui/material/styles/styled";
import {IRegistrationValues} from "../../types/auth.type";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {ApolloError, useMutation} from "@apollo/client";
import {REGISTER_USER} from "../../api/api";

const StyledTextField = styled(TextField)({
    '& p.MuiFormHelperText-root': {
        position: 'absolute',
        left: 0,
        bottom: 0,
        transform: 'translateY(100%)'
    }
});

export const RegistrationPage = observer(() => {
    const {appStore: {setInfoPopup}} = useStore();

    const [register, {data, loading, error}] = useMutation<{ message: string }>(
        REGISTER_USER, {
            onError: (error: ApolloError) => {},
            onCompleted: (data) => {
                setInfoPopup({open: true, severity: "success", text: `User registered`})
                navigate('/login');
            }
        }
    )

    const initialValues: IRegistrationValues = {
        login: '',
        email: '',
        password: '',
    };

    const navigate = useNavigate();

    const onSubmit = async (values: IRegistrationValues, formikHelpers: FormikHelpers<IRegistrationValues>) => {
        try {
            await register({
                variables: {
                    registrationData: values
                }
            })
        } catch (e: any) {
            //console.log(e)
        } finally {
            formikHelpers.setSubmitting(false);
            formik.resetForm()
        }
    };

    const validate = (values: IRegistrationValues): FormikErrors<IRegistrationValues> => {
        const errors: FormikErrors<IRegistrationValues> = {};
        if (!values.login) {
            errors.login = 'required'
        }
        if (!values.email) {
            errors.email = 'required'
        }
        if (!values.password) {
            errors.password = 'required'
        }
        return errors;
    };

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit
    });

    return (
        <div className={style.registrationPage}>
            <form onSubmit={formik.handleSubmit}
                  className={style.form}
            >
                <Typography variant='h4' align='center'>
                    Registration
                </Typography>
                <StyledTextField type="text"
                                 fullWidth
                                 variant="outlined"
                                 id="login"
                                 label="Login"
                                 {...formik.getFieldProps('login')}
                                 error={formik.touched.login && Boolean(formik.errors.login)}
                                 helperText={formik.touched.login && formik.errors.login}
                                 className={style.field}
                />
                <StyledTextField type="text"
                                 fullWidth
                                 variant="outlined"
                                 id="email"
                                 label="email"
                                 {...formik.getFieldProps('email')}
                                 error={formik.touched.email && Boolean(formik.errors.email)}
                                 helperText={formik.touched.email && formik.errors.email}
                                 className={style.field}
                />
                <StyledTextField type="password"
                                 fullWidth
                                 variant="outlined"
                                 id="password"
                                 label="Password"
                                 {...formik.getFieldProps('password')}
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

