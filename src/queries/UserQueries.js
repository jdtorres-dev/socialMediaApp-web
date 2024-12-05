import { useQuery } from "@tanstack/react-query";
import UserService from "../service/UserService";

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["getUserById", id],
    queryFn: async () => {
      const { data } = await UserService.getUserById(id);
      return data;
    },
    enabled: !!id,
  });
};
