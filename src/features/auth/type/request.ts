
export interface UserSignupRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string | null;
  userRole: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}