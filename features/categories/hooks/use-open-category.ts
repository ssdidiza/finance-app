import { create } from "zustand";

// Define the type for the state and actions
type OpenCategoryState = {
  id?: string; // The ID of the account to be opened, if any
  isOpen: boolean; // Whether the account sheet is open
  onOpen: (id: string) => void; // Function to open the account sheet with a specific ID
  onClose: () => void; // Function to close the account sheet
};

// Create a Zustand store for managing the state of the account sheet
export const useOpenCategory = create<OpenCategoryState>((set) => ({
  id: undefined, // Initialize ID as undefined
  isOpen: false, // Initialize the sheet as closed

  // Function to open the sheet and set the account ID
  onOpen: (id: string) => set({ isOpen: true, id }),

  // Function to close the sheet and reset the account ID
  onClose: () => set({ isOpen: false, id: undefined }),
}));
