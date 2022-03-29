export type AuthData = {
  login: string,
  password: string,
}

export type UserData = {
  id: number,
  email: string,
  token: string,
  avatar: string,
  name: string,
  isPro: boolean,
}

export type RawUserData = {
  id: number,
  email: string,
  token: string,
  avatarUrl?: string,
  name: string,
  isPro: boolean,
}
