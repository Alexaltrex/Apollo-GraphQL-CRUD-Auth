import {IProduct} from "./product.type";

export interface ICategory {
    id: string
    name: string
    products: IProduct[]
}

export type ICategoryListItem = Omit<ICategory, "products">
