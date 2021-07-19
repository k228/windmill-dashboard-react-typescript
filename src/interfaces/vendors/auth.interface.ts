export interface IUser{
    username:string
}

export interface IAuthState{
    isAuth:number,
    currentUser?:IUser
}

export interface ILoginResponse {
    user:IUser,
    token:string,
    tokenExpiration:number
}