import axiosInstance from "../axios/axios"
import { endPoints } from "../endpoints/endpoint"
import {productList} from "../../typeScripts/product.interface"

export const productListFn = async () => {
    const res = await axiosInstance.get<productList>(endPoints.cms.productLists)
    console.log(res, "ProductList")
    return res.data
}
