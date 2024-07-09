import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";

// Define types for the response and request using InferResponseType and InferRequestType from Hono
type ResponseType = InferResponseType<
  (typeof client.api.transactions)[":id"]["$delete"]
>;

export const useDeleteTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  // Define the mutation using React Query's useMutation
  const mutation = useMutation<ResponseType, Error>({
    // Define the mutation function
    mutationFn: async () => {
      // Make the PATCH request to update the transaction
      const response = await client.api.transactions[":id"]["$delete"]({
        param: { id },
      });

      // Parse the response JSON
      return await response.json();
    },
    // Define the success handler
    onSuccess: () => {
      // Show a success toast message
      toast.success("Transaction deleted");

      // Invalidate the queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });

    },
    // Define the error handler
    onError: () => {
      // Show an error toast message
      toast.error("Failed to delete  transaction");
    },
  });

  return mutation;
};
