export interface UserProfile {
  id: unknown;
  firstname: string;
  surname: string;
  email: string;
  role: string;
  phoneNumber: string;
}

interface LoggedInUser {
  id?: unknown;
  firstname?: string;
  surname?: string;
  email?: string;
  role?: string;
  phoneNumber?: string;
}

export interface UserLoginPayload {
  id?: unknown;
  firstname?: string;
  surname?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
  user?: LoggedInUser;
  token?: string;
}
