import axiosInstance from "../axios/axios"
import { endPoints } from "../endpoints/endpoint"

export const userLoginFn = async (payload:any) => {
    const res = await axiosInstance.post(endPoints.auth.login, payload)
    console.log(res, "userLogin")
    return res.data
}