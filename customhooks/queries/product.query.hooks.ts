import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query"
import { Cookies } from "react-cookie";
import { useGlobalHooks } from "../globalHooks/globalhooks";
import toast from "react-hot-toast";
import { productCreateProps,productList,productDetail,productDelete } from "@/typeScripts/product.interface";
import { productCreateFn } from "@/api/functions/product.create";
import { productListFn } from "@/api/functions/product.list";
import { productDetailsFn } from "@/api/functions/product.details";
import { productDeleteFn } from "@/api/functions/product.delete";
import { productUpdateFn } from "@/api/functions/product.update";


//product create
// export const productCreateMutation = (): UseMutationResult<productCreateProps, unknown> => {
//     const { queryClient } = useGlobalHooks()
//     const cookie = new Cookies()
//     return useMutation<productCreateProps, void, unknown>({
//         mutationFn: productCreateFn,
//         onSuccess: (res) => {
//             const { token, status, message,product } = res || {}
//             console.log(res);
//             if (status === 200 && token) {
//                 cookie.set("token", token, { path: "/cms/product_create", secure: true })
//                 localStorage.setItem("product", JSON.stringify(product))
//             }
//             toast.success(`${message}`);
//             queryClient.invalidateQueries({ queryKey: ["PRODUCT"] })
//         },
//         onError:(error:any, variables, context)=> {
//             toast.error(`${error?.response.data.message||error?.message}`);
//             queryClient.invalidateQueries({ queryKey: ["PRODUCT"] })
//         }
//     })

// }

export const productCreateMutation = (): UseMutationResult<
  productCreateProps,         // response type
  unknown,                    // error type (you can customize this)
  URLSearchParams             // variable (input) type
> => {
  const { queryClient } = useGlobalHooks();
  const cookie = new Cookies();

  return useMutation<productCreateProps, unknown, URLSearchParams>({
    mutationFn: productCreateFn,
    onSuccess: (res) => {
      const { token, status, message, product } = res || {};
      console.log(res);
      if (status === 200 && token) {
        cookie.set("token", token, { path: "/cms/product_create", secure: true });
        localStorage.setItem("product", JSON.stringify(product));
      }
      toast.success(`${message}`);
      queryClient.invalidateQueries({ queryKey: ["PRODUCT"] });
    },
    onError: (error: any) => {
      toast.error(`${error?.response?.data?.message || error?.message}`);
      queryClient.invalidateQueries({ queryKey: ["PRODUCT"] });
    }
  });
};


//Product List
export const productListQuery = (): UseQueryResult<productList, unknown> => {
    return useQuery({
        queryKey: ["PRODUCT"],  
        queryFn: productListFn
    });
};

export const productDetailsQuery = (
    id: string | null
  ): UseQueryResult<productDetail, unknown> => {
    return useQuery({
      queryKey: ['PRODUCT_EDIT', id],
      queryFn: () => (id ? productDetailsFn(id) : Promise.reject('Invalid ID')),
      enabled: !!id,
      retry: false,
    });
  };

export const useProductDeleteMutation = () => {
    //const queryClient = useQueryClient();
    const { queryClient } = useGlobalHooks()
    return useMutation({
      mutationFn: (id: number) => productDeleteFn(id),
      onSuccess: () => {
        // Invalidate product list after delete
        queryClient.invalidateQueries({ queryKey: ['PRODUCT_LIST'] });
      },
    });
  };
  
  export const useProductUpdate = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: any }) => productUpdateFn(id,data),
    });
  };
