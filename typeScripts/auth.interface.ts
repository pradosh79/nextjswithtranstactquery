export interface IloginProps {
    email: string,
    password: string,
    token: string,
    message: string,
    status: string
}
export interface IregisterProps {
    name: string,
    email: string,
    mobile: string,
    password: string,
    photo: FileList,
    token: string,
    message: string,
    status: string
}
export interface IverifyProps {
    email: string,
    password: string,
    token: string,
    status: string,
    message: string,
}
export interface loginProps extends IloginProps {
    user: IloginProps
}

export interface registerProps extends IregisterProps {
    user: IregisterProps
}

export interface verifyProps extends IverifyProps {
    user: IverifyProps
}