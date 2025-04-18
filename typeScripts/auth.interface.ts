export interface IloginProps {
    email: string,
    password: string,
    token: string,
    message: string,
    status: boolean
}
export interface IregisterProps {
    name: string,
    email: string,
    mobile: string,
    password: string,
    photo: FileList,
    token: string,
    message: string,
    status: boolean
}
export interface IverifyProps {
    email: string,
    password: string,
    token: string,
    status: boolean,
    message: string,
}
interface IPasswordFormInputs {
    password: string;
    token: string,
    status: boolean,
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

export interface passwordupdateProps extends IPasswordFormInputs {
    user: IPasswordFormInputs
}
