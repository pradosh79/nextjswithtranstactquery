import axiosInstance from "../axios/axios";
import { endPoints } from "../endpoints/endpoint";
import { productDetail } from "../../typeScripts/product.interface";

export const productUpdateFn = async (
    id: string,
    payload: Partial<productDetail>
  ): Promise<productDetail> => {
    try {
      const res = await axiosInstance.put<productDetail>(
        `${endPoints.cms.productUpdate}/${id}`,
        payload
      );
      return res.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw new Error("Failed to update product");
    }
  };
  