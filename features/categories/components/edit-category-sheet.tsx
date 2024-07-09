import { z } from "zod";
import { Loader2 } from "lucide-react";

import { useGetCategory } from "../api/use-get-category";
import { insertCategorySchema } from "@/db/schema";
import { useOpenCategory } from "../hooks/use-open-category";
import { CategoryForm } from "./category-form";
import { useEditCategory } from "../api/use-edit-category";
import { useDeleteCategory } from "../api/use-delete-category";
import { useConfirm } from "@/hooks/use-confirm";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// Define the schema for the form values
const formSchema = insertCategorySchema.pick({
  name: true,
});

// Infer the form values type from the schema
type FormValues = z.infer<typeof formSchema>;

// Component to edit or create an category using a sheet (sidebar)
export const EditCategorySheet = () => {
  // Hook to manage the open state of the category sheet and get the category ID
  const { isOpen, onClose, id } = useOpenCategory();

  const [ConfrimDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this account"
  )

  // Hook to fetch account data if an ID is provided
  const categoryQuery = useGetCategory(id);

  // Hook to handle the mutation for editing the category
  const editMutation = useEditCategory(id);


  const deleteMutation = useDeleteCategory(id);
  // Loading state for the category query
  const isLoading = categoryQuery.isLoading;

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

  // Default values for the form, based on the fetched category data or empty if no data
  const defaultValues = categoryQuery.data
    ? { name: categoryQuery.data.name }
    : { name: "" };

  return (
    <>
      <ConfrimDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit an existing account.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <CategoryForm
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
