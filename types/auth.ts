export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  user: {
    _id: string; // Normalized to `id`
    id: string; // Normalized to `id`
    name: string;
    email: string;
    role: "Player" | "Official";
  };
  accessToken: string;
  refreshToken: string;
}

// ------------Register (SignUp) -------------

export interface IRegisterRequest {
  fullName: string;
  email: string;
  phone_number: string;
  username: string;
  role: "Player" | "Official";
  gender: "Male" | "Female" | "Other";
  password: string;
  age?: number;
  weight?: number;
}

export interface IRegisterResponse {
  message: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
    username: string;
    phone_number: string;
    role: "Player" | "Official";
    gender: string;
    age?: number;
    weight?: number;
  };
}

export interface ILogoutResponse {
  message: string;
}
