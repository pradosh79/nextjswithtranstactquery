import axiosInstance from "../axios/axios";
import { endPoints } from "../endpoints/endpoint";
import { productDetail } from "../../typeScripts/product.interface";

export const productDetailsFn = async (id: string): Promise<productDetail> => {
    try {
      const res = await axiosInstance.get<productDetail>(
        `${endPoints.cms.productDetails}/${id}`
      );
      return res.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw new Error('Failed to fetch product details');
    }
  };
  