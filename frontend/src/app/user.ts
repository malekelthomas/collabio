export interface User {
  email: string;
  user_name: string;
  password: string;
  followers: Array<string>;
  following: Array<string>;
  token: string;
}
