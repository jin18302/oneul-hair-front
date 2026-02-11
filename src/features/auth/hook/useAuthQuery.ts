import { useMutation } from "@tanstack/react-query";
import { useLoginInfoStore } from "../../../contexts/loginInfoStore";
import { userService } from "../../user/service/userService";
import { authService } from "../service/authService";
import type { OwnerSignUpData, SignupData } from "../type/formData";
import type { LoginRequest } from "../type/request";


export function useUserSignUpQuery() {

      const mutation = useMutation({
            mutationFn: (formData: SignupData) => {
                  return authService.signUp(formData)
            }
      });
      return mutation;
}

export function useOwnerSignupQuery() {
    const mutate = useMutation({
        mutationFn:  (data : OwnerSignUpData) => {
         return authService.ownerSignUp(data);
        }
    });
    return mutate;
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