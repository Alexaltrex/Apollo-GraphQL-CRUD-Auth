import React, {FC, useState} from "react";
import {CreateProductErrorType, CreateProductType, IProduct} from "../../../types/product.type";
import style from "./UpdateProductItem.module.scss"
import {Button, TextField} from "@mui/material";
import {Form, Formik, FormikHelpers, FormikProps, useFormik} from "formik";
import {ApolloError, useMutation, useQuery} from "@apollo/client";
import {GET_CATEGORY_LIST, GET_PRODUCTS, GET_PRODUCTS_OF_CATEGORY, UPDATE_PRODUCT} from "../../../api/api";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/useStore";
import {TokenErrorWrapper} from "../../X_Common/TokenErrorWrapper/TokenErrorWrapper";
import {ICategoryListItem} from "../../../types/category.type";
import {FieldsetCustom} from "../../X_Common/FieldsetCustom/FieldsetCustom";
import {FieldText} from "../../X_Common/FieldText/FieldText";
import {FieldSelect, IMenuItem} from "../../X_Common/FieldSelect/FieldSelect";
import {HexColorPicker} from "react-colorful";

export const UpdateProductItem: FC<IProduct> = observer(({id, name, color, count, categoryId}) => {
    const {appStore: {setInfoPopup}} = useStore();

    const {
        loading: loadingCategories,
        error: errorCategories,
        data: dataCategories
    } = useQuery<{ categories: ICategoryListItem[] }>(GET_CATEGORY_LIST);

    const [showForm, setShowForm] = useState(false)

    const [updateProduct, {data: dataUpdate, loading: loadingUpdate, error}] = useMutation<{ updateProduct: IProduct }>(
        UPDATE_PRODUCT, {
            refetchQueries: (result) => {
                const oldCategoryId = categoryId;
                const newCategoryId = result?.data?.updateProduct.categoryId;
                const queries = [
                    {query: GET_PRODUCTS},
                    {query: GET_PRODUCTS_OF_CATEGORY, variables: {id: oldCategoryId}}
                ]
                if (newCategoryId && newCategoryId !== oldCategoryId) {
                    queries.push({query: GET_PRODUCTS_OF_CATEGORY, variables: {id: newCategoryId}})
                }
                return queries
            },
            onError: (error: ApolloError) => {
                // console.log(error)
                // setInfoPopup({open: true, severity: "error", text: error.message})
            },
            onCompleted: (data) => {
                setInfoPopup({open: true, severity: "success", text: `${data.updateProduct.name} is updated`})
            }
        }
    );

    const initialValues: CreateProductType = {
        name,
        count,
        categoryId
    }
    const validate = (values: CreateProductType) => {
        const error = {} as CreateProductErrorType
        if (!values.name) {
            error.name = "required"
        }
        return error
    }
    const onSubmit = async (
        values: CreateProductType,
        formikHelpers: FormikHelpers<CreateProductType>
    ) => {
        try {
            //console.log(values)
            await updateProduct({
                variables: {
                    updateProductData: {id, color: colorLocal, ...values}
                }
            })
        } catch (e: any) {
            console.log(e) // не задействовано, обрабатывается через onError
        } finally {
            formikHelpers.setSubmitting(false);
            formikHelpers.resetForm();
        }
    }

    const [colorLocal, setColorLocal] = useState(color);

    return (
        <TokenErrorWrapper error={error}>
            <div className={style.updateProductItem}>
                <div className={style.header}>
                    <p>{name}</p>
                    <Button className={style.btn}
                            variant="outlined"
                            size="small"
                            color={showForm ? "error" : "primary"}
                            onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? "close form" : "open form"}
                    </Button>
                </div>

                {
                    dataCategories && showForm && (
                        <Formik initialValues={initialValues}
                                validate={validate}
                                onSubmit={onSubmit}
                                enableReinitialize={true}
                        >
                            {
                                (props: FormikProps<CreateProductType>) => (
                                    <FieldsetCustom label="Update product" className={style.fieldsetCustom}>
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

                                                    <div className={style.field}>
                                                        color: {colorLocal}
                                                    </div>
                                                </div>

                                                <div className={style.colorPicker}>
                                                    <HexColorPicker color={"green"}
                                                                    onChange={(color: string) => setColorLocal(color)}/>
                                                </div>

                                            </div>

                                            <Button color="primary"
                                                    variant="contained"
                                                    fullWidth
                                                    type="submit"
                                                    size="small"
                                                    className={style.btn}
                                            >
                                                Update product
                                            </Button>
                                        </Form>

                                    </FieldsetCustom>
                                )
                            }
                        </Formik>
                    )
                }
            </div>
        </TokenErrorWrapper>
    )
})
