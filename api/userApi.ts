import { useQuery } from "react-query";
import httpClient from "lib/httpClient";

export function useUsers(id?: number, email?: string, name?: string) {
  return useQuery(["useUsers"], async () => {
    const res = await httpClient.get("users", {
      params: {
        id,
        email,
        name,
      },
    });
    return res.data as User[];
  });
}
