export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  user: {
    name: string;
    email: string;
    role: "Player" | "Official";
  };
  token: string;
}
