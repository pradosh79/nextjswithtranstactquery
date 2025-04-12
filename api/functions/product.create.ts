import axiosInstance from "../axios/axios"
import { endPoints } from "../endpoints/endpoint"
import {productCreateProps} from "../../typeScripts/product.interface"

export const productCreateFn = async (formData: URLSearchParams) => {
    const res = await axiosInstance.post<productCreateProps>(endPoints.cms.productCreate,formData)
    console.log(res, "ProductList")
    return res.data
}