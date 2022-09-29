export interface IProduct {
    id: string
    name: string
    color: string
    count: number
    categoryId: string
}

export type CreateProductType = Omit<IProduct, "id" | "color">

export type CreateProductErrorType = Partial<CreateProductType>

