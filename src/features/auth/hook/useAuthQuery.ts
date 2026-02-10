import { useMutation } from "@tanstack/react-query";
import { useLoginInfoStore } from "../../../contexts/loginInfoStore";
import { userService } from "../../user/service/userService";
import { authService } from "../service/authService";
import type { LoginRequest, UserSignupRequest } from "../type/request";


export function useSignUpQuery() {

      const mutation = useMutation({
            mutationFn: (request: UserSignupRequest) => {
                  return authService.signUp(request)
            }
      });
      return mutation;
}

export function useLoginQuery() {

      const setLoginInfo = useLoginInfoStore(s => s.setLoginInfo);

      const mutation = useMutation({
            mutationFn: async (request: LoginRequest) => {
                  return authService.login(request)
            },
            onSuccess: async () => {
                  const resposne = await userService.getUser();
                  setLoginInfo(resposne);
            }
      });
      return mutation;
}