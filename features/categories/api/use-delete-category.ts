import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";

// Define types for the response and request using InferResponseType and InferRequestType from Hono
type ResponseType = InferResponseType<
  (typeof client.api.categories)[":id"]["$delete"]
>;

export const useDeleteCategory = (id?: string) => {
  const queryClient = useQueryClient();

  // Define the mutation using React Query's useMutation
  const mutation = useMutation<ResponseType, Error>({
    // Define the mutation function
    mutationFn: async () => {
      // Make the PATCH request to update the category
      const response = await client.api.categories[":id"]["$delete"]({
        param: { id },
      });

      // Parse the response JSON
      return await response.json();
    },
    // Define the success handler
    onSuccess: () => {
      // Show a success toast message
      toast.success("Category deleted");

      // Invalidate the queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["category", { id }] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });

    },
    // Define the error handler
    onError: () => {
      // Show an error toast message
      toast.error("Failed to delete  category");
    },
  });

  return mutation;
};
