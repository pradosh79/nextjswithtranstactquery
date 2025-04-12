import axiosInstance from "../axios/axios";
import { endPoints } from "../endpoints/endpoint";
import { productDetail } from "../../typeScripts/product.interface";

export const productDeleteFn = async (id: number) => {
    try {
        const res = await axiosInstance.delete<productDetail>(`${endPoints.cms.productRemove}/${id}`);
        console.log("Product Details:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error fetching product details:", error);
        throw new Error("Failed to fetch product details");
    }
};