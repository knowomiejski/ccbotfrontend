export interface IUser {
    username: string,
    displayName: string,
    token: string,
    image?: string
}

export interface IUserLoginFormValues {
    email: string,
    password: string
}
