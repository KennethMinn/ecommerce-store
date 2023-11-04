import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

// const useCart = create(
//   persist<CartStore>(
//     (set) => ({
//       items: [],
//       addItem: (data: Product) => {
//         set((state) => {
//           const existingItem = state.items.find((item) => item.id === data.id);

//           if (existingItem) {
//             toast("Item already in cart.");
//             // console.log(state); {items:[{...},{...}], addItem:(data)=>{}, removeItem:(id)=>{},removeAll:()=>{}}
//             return state;
//           }

//           const updatedItems = [...state.items, data];
//           toast.success("Item added to cart.");
//           return { ...state, items: updatedItems };
//         });
//       },
//       removeItem: (id: string) => {
//         set((state) => {
//           const updatedItems = state.items.filter((item) => item.id !== id);
//           toast.success("Item removed from cart.");
//           return { ...state, items: updatedItems };
//         });
//       },
//       removeAll: () => {
//         set((state) => {
//           toast.success("All items removed from cart.");
//           return { ...state, items: [] };
//         });
//       },
//     }),
//     {
//       name: "cart-storage",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        // console.log(currentItems); [{},{}] => Product[]
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast.error("Item already in cart.");
        }

        set({ items: [...get().items, data] });
        toast.success("Item added to cart.");
      },
      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        toast.success("Item removed from cart.");
      },
      removeAll: () => {
        set({ items: [] });
        toast.success("All items removed from cart.");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
