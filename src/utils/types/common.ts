import { UserLoginPayload } from "./user";

export interface ValidateLoginProps {
  email: string;
  password: string;
}

export interface LoginVetEmailServiceResponse {
  isSuccess: boolean;
  error?: string;
  status: number;
  message?: string;
  result?: UserLoginPayload;
}

export interface ResponseProps {
  message: string;
  status: number;
}

export interface AdminProps {
  email: string;
  password: string;
  role: string;
  firstname: string;
  lastname: string;
}
