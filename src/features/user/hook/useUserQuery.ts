import { useQuery } from "@tanstack/react-query";
import { useLoginInfoStore } from "../../../contexts/loginInfoStore";
import { userService } from "../service/userService";

export function useGetUserInfoQuery() {

    const isLoggedIn = useLoginInfoStore(s => s.isLoggedIn);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
           return userService.getUser();
        },
        enabled:isLoggedIn
    }
);
    return { data, isLoading, refetch };
}