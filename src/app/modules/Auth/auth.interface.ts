export interface ILoginUser {
  email: string
  password: string
}

export interface IRegisterUser {
  name: string
  email: string
  password: string
  phone: string
  avatar :string
  
}

export interface IAuthResponse {
  user: {
    id: string
    name: string
    email: string
    role: string
  }
  accessToken: string
}
