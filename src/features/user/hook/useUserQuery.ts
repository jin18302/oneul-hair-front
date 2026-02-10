import { useSuspenseQuery } from "@tanstack/react-query";
import { userService } from "../service/userService";

export function useGetUserInfoQuery() {

    const { data, isLoading, refetch } = useSuspenseQuery({
        queryKey: ["profile"],
        queryFn: async () => {
           return userService.getUser();
        }
    }
);
    return { data, isLoading, refetch };
}