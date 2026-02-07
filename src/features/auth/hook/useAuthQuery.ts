import { useMutation } from "@tanstack/react-query";
import { authService } from "../service/authService";
import type { LoginRequest, UserSignupRequest } from "../type/request";


export function useSignUpQuery() {

      const mutation = useMutation({
            mutationFn: (request: UserSignupRequest) => {
                return  authService.signUp(request)
            } 
      });
      return mutation;
}

export function useLoginQuery() {

      const mutation = useMutation({
            mutationFn: async (request: LoginRequest) => {
                  return authService.login(request)
            } 
      });
      return mutation;
}