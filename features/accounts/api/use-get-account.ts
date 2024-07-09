import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type AccountResponse = {
  data: {
    id: string;
    name: string;
  };
};

export const useGetAccount = (id?: string) => {
  const query = useQuery<AccountResponse["data"], Error>({
    enabled: !!id,
    queryKey: ["account", { id }],
    queryFn: async () => {
      const response = await client.api.accounts[":id"].$get({ 
        param: {id},
      });

      if (!response.ok) {
        throw new Error("Failed to fetch account");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
