import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';  // Make sure the path to the client is correct

export const useGetCategories = () => {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await client.api.categories.$get();

      if (!response.ok) {
        throw new Error('Failed to fetch C]categories');
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
