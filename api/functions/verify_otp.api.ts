import axiosInstance from "../axios/axios"
import { endPoints } from "../endpoints/endpoint"

export const userVerificationFn = async (payload:any) => {
    const res = await axiosInstance.post(endPoints.auth.verify_otp, payload)
    console.log(res, "userverification")
    return res.data
}