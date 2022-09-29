import {ApolloError, useMutation, useQuery} from "@apollo/client";
import React, {useState} from "react";
import style from "./CreatePage.module.scss"
import {CreateProductType, CreateProductErrorType, IProduct} from "../../types/product.type";
import {Form, Formik, FormikHelpers, FormikProps, useFormik} from "formik";
import {Button} from "@mui/material";
import {CREATE_PRODUCT, GET_CATEGORY_LIST, GET_PRODUCTS, GET_PRODUCTS_OF_CATEGORY} from "../../api/api";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {LinearPreloader} from "../X_Common/LinearPreloader/LinearPreloader";
import {Navigate} from "react-router-dom";
import {TokenErrorWrapper} from "../X_Common/TokenErrorWrapper/TokenErrorWrapper";
import {FieldsetCustom} from "../X_Common/FieldsetCustom/FieldsetCustom";
import {FieldText} from "../X_Common/FieldText/FieldText";
import {ICategoryListItem} from "../../types/category.type";
import {FieldSelect, IMenuItem} from "../X_Common/FieldSelect/FieldSelect";
import {HexColorPicker} from "react-colorful";
import {getUserInfo} from "../../localStorage/localStorage";

export const CreatePage = observer(() => {
    const {appStore: {setInfoPopup}, authStore: {auth}} = useStore();

    const {loading, error, data} = useQuery<{ products: IProduct[] }>(GET_PRODUCTS);

    const {
        loading: loadingCategories,
        error: errorCategories,
        data: dataCategories
    } = useQuery<{ categories: ICategoryListItem[] }>(GET_CATEGORY_LIST);

    const [createProduct, {data: dataCreate, loading: createLoading, error: createError}] = useMutation<{ createProduct: IProduct }>(
        CREATE_PRODUCT,
        {
            refetchQueries: (result) => [
                {query: GET_PRODUCTS},
                {query: GET_PRODUCTS_OF_CATEGORY, variables: {id: result?.data?.createProduct.categoryId}}
            ]
            ,
            // ошибки обрабатываются через Link
            onError: (error: ApolloError) => {
                //console.log(error)
                //setInfoPopup({open: true, severity: "error", text: error.message})
                //ошибки обрабатываются через Link
            },
            onCompleted: (data) => {
                setInfoPopup({open: true, severity: "success", text: `${dataCreate?.createProduct.name} is created`})
            }
        }
    );

    const initialValues: CreateProductType = {
        name: "",
        count: 1,
        categoryId: ""
    }

    const validate = (values: CreateProductType) => {
        const error = {} as CreateProductErrorType
        if (!values.name) {
            error.name = "required"
        }
        if (!values.categoryId) {
            error.categoryId = "required"
        }

        return error
    }
    const onSubmit = async (
        values: CreateProductType,
        formikHelpers: FormikHelpers<CreateProductType>
    ) => {
        try {
            console.log(values)
            await createProduct({
                variables: {
                    createProductData: {color, ...values}
                }
            })
        } catch (e: any) {
            console.log(e) // не задействовано, обрабатывается через onError
        } finally {
            formikHelpers.setSubmitting(false);
            formikHelpers.resetForm();
        }
    }

    const [color, setColor] = useState("#000");

    const userInfo = getUserInfo();

    if (!auth && !userInfo) {
        return (
            <Navigate to="/"/>
        )
    }

    return (
        <TokenErrorWrapper error={createError}>
            <div className={style.createPage}>

                {(loading || loadingCategories || createLoading) && !error && !createError && !errorCategories &&
                <LinearPreloader/>}

                <h1 className={style.title}>Create product (Updating local data by refetching queries)</h1>

                {
                    data && dataCategories && (
                        <>
                            <div className={style.list}>
                                {
                                    data.products.map(({id, name}) => (
                                        <p key={id}>{name}</p>
                                    ))
                                }
                            </div>

                            <Formik initialValues={initialValues}
                                    validate={validate}
                                    onSubmit={onSubmit}
                            >
                                {
                                    (props: FormikProps<CreateProductType>) => (
                                        <FieldsetCustom label="Create product" className={style.fieldsetCustom}>
                                            <Form className={style.form}>
                                                <div className={style.formInner}>
                                                    <div className={style.fields}>
                                                        <FieldText name="name"
                                                                   label="Product name"
                                                                   size="small"
                                                                   placeholder="Enter product name"
                                                                   className={style.field}
                                                                   fullWidth
                                                        />
                                                        <FieldText type="number"
                                                                   name="count"
                                                                   label="Product count"
                                                                   size="small"
                                                                   className={style.field}
                                                                   fullWidth
                                                        />
                                                        <FieldSelect name="categoryId"
                                                                     label="Category"
                                                                     className={style.field}
                                                                     menuItems={
                                                                         [
                                                                             {value: "", label: ""},
                                                                             ...dataCategories.categories.map(({id, name}) => ({
                                                                                 value: id,
                                                                                 label: name
                                                                             }))
                                                                         ] as IMenuItem[]
                                                                     }
                                                        />
                                                    </div>

                                                    <div className={style.colorPicker}>
                                                        <HexColorPicker color={color}
                                                                        onChange={(color: string) => setColor(color)}/>
                                                    </div>

                                                </div>

                                                <Button color="primary"
                                                        variant="contained"
                                                        fullWidth
                                                        type="submit"
                                                        size="small"
                                                        className={style.btn}
                                                >
                                                    Create product
                                                </Button>
                                            </Form>

                                        </FieldsetCustom>
                                    )
                                }
                            </Formik>
                        </>
                    )
                }
            </div>
        </TokenErrorWrapper>
    )
})
