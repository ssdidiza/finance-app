import { z } from "zod";
import { Loader2 } from "lucide-react";

import { useGetAccount } from "../api/use-get-account";
import { insertAccountSchema } from "@/db/schema";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { AccountForm } from "./account-form";
import { useEditAccount } from "../api/use-edit-account";
import { useDeleteAccount } from "../api/use-delete-account";
import { useConfirm } from "@/hooks/use-confirm";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// Define the schema for the form values
const formSchema = insertAccountSchema.pick({
  name: true,
});

// Infer the form values type from the schema
type FormValues = z.infer<typeof formSchema>;

// Component to edit or create an account using a sheet (sidebar)
export const EditAccountSheet = () => {
  // Hook to manage the open state of the account sheet and get the account ID
  const { isOpen, onClose, id } = useOpenAccount();

  const [ConfrimDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this account"
  )

  // Hook to fetch account data if an ID is provided
  const accountQuery = useGetAccount(id);

  // Hook to handle the mutation for editing the account
  const editMutation = useEditAccount(id);


  const deleteMutation = useDeleteAccount(id);
  // Loading state for the account query
  const isLoading = accountQuery.isLoading;

  // Pending state for the mutation
  const isPending = editMutation.isPending ||
    deleteMutation.isPending

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {deleteMutation.mutate(undefined, {
      onSuccess: () => {
        onClose();
      }
    })
    }
  }

  // Default values for the form, based on the fetched account data or empty if no data
  const defaultValues = accountQuery.data
    ? { name: accountQuery.data.name }
    : { name: "" };

  return (
    <>
      <ConfrimDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit an existing account.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <AccountForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
