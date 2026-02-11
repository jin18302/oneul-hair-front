
export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string | null;
  userRole: string;
  profileImage: string | null;
}

export const signupReqInit = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  gender: "",
  userRole: "",
  profileImage: null
}

export interface LoginRequest {
  email: string;
  password: string;
}