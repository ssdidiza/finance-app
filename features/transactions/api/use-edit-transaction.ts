import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";

// Define types for the response and request using InferResponseType and InferRequestType from Hono
type ResponseType = InferResponseType<
  (typeof client.api.transactions)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.transactions)[":id"]["$patch"]
>["json"];

/**
 * Custom hook to edit an transaction.
 * 
 * @param {string} [id] - The ID of the transaction to edit.
 * @returns {object} - The mutation object from React Query.
 */
export const useEditTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  // Define the mutation using React Query's useMutation
  const mutation = useMutation<ResponseType, Error, RequestType>({ 
    // Define the mutation function
    mutationFn: async (json) => {
      // Make the PATCH request to update the Transaction
      const response = await client.api.transactions[":id"]["$patch"]({
        json,
        param: { id },
      });

      // Parse the response JSON
      return await response.json();
    },
    // Define the success handler
    onSuccess: () => {
      // Show a success toast message
      toast.success("Transaction updated");

      // Invalidate the queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });

      // TODO: Invalidate summary 
    },
    // Define the error handler
    onError: () => {
      // Show an error toast message
      toast.error("Failed to edit transaction");
    },
  });

  return mutation;
};
