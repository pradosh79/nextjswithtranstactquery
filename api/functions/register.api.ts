import axiosInstance from "../axios/axios"
import { endPoints } from "../endpoints/endpoint"

export const userRegisterFn = async (payload:any) => {
    const res = await axiosInstance.post(endPoints.auth.registration, payload)
    console.log(res, "userCreate")
    return res.data
}