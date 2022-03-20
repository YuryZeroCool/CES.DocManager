export interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
}

export interface UserState {
  userName: string;
  email: string;
  token: string;
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

// export enum UserActionTypes {
//   FETCH_USERS = 'FETCH_USERS',
//   FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
//   FETCH_USERS_ERROR = 'FETCH_USERS_FETCH_USERS_ERROR',
// }

// interface FetchUsersAction {
//   type: UserActionTypes.FETCH_USERS;
// }

// interface FetchUsersSuccessAction {
//   type: UserActionTypes.FETCH_USERS_SUCCESS;
//   payload: any[]
// }

// interface FetchUsersErrorAction {
//   type: UserActionTypes.FETCH_USERS_ERROR;
//   payload: string;
// }

// export type UserAction = FetchUsersAction | FetchUsersErrorAction | FetchUsersSuccessAction;
