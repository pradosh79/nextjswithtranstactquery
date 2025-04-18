import { loginProps,passwordupdateProps,registerProps, verifyProps} from "@/typeScripts/auth.interface"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { userLoginFn } from "../../api/functions/login.api"
import {userRegisterFn} from "../../api/functions/register.api"
import { Cookies } from "react-cookie";
import { useGlobalHooks } from "../globalHooks/globalhooks";
import toast from "react-hot-toast";
import { userVerificationFn } from "@/api/functions/verify_otp.api";
import { userPasswordUpdateFn } from "@/api/functions/password.update";

export const loginMutation = (): UseMutationResult<loginProps, unknown> => {
    const { queryClient } = useGlobalHooks()
    const cookie = new Cookies()
    return useMutation<loginProps, void, unknown>({
        mutationFn: userLoginFn,
        onSuccess: (res) => {
            const { token, status, message,user } = res || {}
            if (status === true && token) {
                cookie.set("token", token, { path: "/", secure: true })
                localStorage.setItem("user", JSON.stringify(user))
            }
            toast.success(`${message}`);
            queryClient.invalidateQueries({ queryKey: ["USER"] })
        },
        onError:(error:any, variables, context)=> {
            toast.error(`${error?.response.data.message||error?.message}`);
            queryClient.invalidateQueries({ queryKey: ["USER"] })
        }
    })

}

export const registerMutation = (): UseMutationResult<registerProps, unknown> => {
    const { queryClient } = useGlobalHooks()
    const cookie = new Cookies()
    return useMutation<registerProps, void, unknown>({
        mutationFn: userRegisterFn,
        onSuccess: (res) => {
            const {token,status, message,user } = res || {}
            //console.log(status,'status');
            //console.log(token,'token');

            if (status === true) {
                //alert('Pradosh');
                cookie.set("token", token, { path: "/registeration", secure: true })
                localStorage.setItem("user", JSON.stringify(user))
            }
            toast.success(`${message}`);
            queryClient.invalidateQueries({ queryKey: ["USER"] })
        },
        onError:(error:any, variables, context)=> {
            toast.error(`${error?.response.data.message||error?.message}`);
            queryClient.invalidateQueries({ queryKey: ["USER"] })
        }
    })

}

export const userRegistration_verifyMutation = (): UseMutationResult<verifyProps, unknown> => {
    const { queryClient } = useGlobalHooks()
    const cookie = new Cookies()
    return useMutation<verifyProps, void, unknown>({
        mutationFn: userVerificationFn,
        onSuccess: (res) => {
            const {token,status,message,user } = res || {}
            if (status === true && token) {
                cookie.set("token", token, { path: "/verify", secure: true })
                localStorage.setItem("user", JSON.stringify(user))
            }
            toast.success(`${message}`);
            queryClient.invalidateQueries({ queryKey: ["USER"] })
        },
        onError:(error:any, variables, context)=> {
            toast.error(`${error?.response.data.message||error?.message}`);
            queryClient.invalidateQueries({ queryKey: ["USER"] })
        }
    })

}


export const userpassword_updateMutation = (): UseMutationResult<passwordupdateProps, unknown> => {
    const { queryClient } = useGlobalHooks()
    const cookie = new Cookies()
    return useMutation<passwordupdateProps, void, unknown>({
        mutationFn: userPasswordUpdateFn,
        onSuccess: (res) => {
            const {token,status,message,user} = res || {}
            if (status === true && token) {
                cookie.set("token", token, { path: "/verify", secure: true })
                localStorage.setItem("user", JSON.stringify(user))
            }
            toast.success(`${message}`);
            queryClient.invalidateQueries({ queryKey: ["USER"] })
        },
        onError:(error:any, variables, context)=> {
            toast.error(`${error?.response.data.message||error?.message}`);
            queryClient.invalidateQueries({ queryKey: ["USER"] })
        }
    })

}