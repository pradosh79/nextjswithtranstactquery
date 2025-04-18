import axiosInstance from "../axios/axios"
import { endPoints } from "../endpoints/endpoint"

export const userPasswordUpdateFn = async (payload:any) => {
    const res = await axiosInstance.post(endPoints.auth.update_password, payload)
    console.log(res, "update_password")
    return res.data
}