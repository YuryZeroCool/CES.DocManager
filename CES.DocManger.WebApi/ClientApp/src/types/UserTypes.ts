export interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
}

export interface UserState extends IAuthResponse {
  status: string;
}

export interface IUserRequest {
  email: string;
  password: string;
}

export interface IAuthResponse {
  userName: string;
  email: string;
  accessToken: string;
}
