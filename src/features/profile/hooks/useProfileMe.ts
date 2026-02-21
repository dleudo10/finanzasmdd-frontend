import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/profile.api";

export const useProfileMe = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
    })
}