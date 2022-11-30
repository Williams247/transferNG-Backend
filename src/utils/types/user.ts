export interface UserProfile {
  id: unknown;
  firstname: string;
  surname: string;
  email: string;
  role: string;
}

interface LoggedInUser {
  id?: unknown;
  firstname?: string;
  surname?: string;
  email?: string;
  role?: string;
}

export interface UserLoginPayload {
  id?: unknown;
  firstname?: string;
  surname?: string;
  email?: string;
  role?: string;
  user?: LoggedInUser;
  token?: string;
}
