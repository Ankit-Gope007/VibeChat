import {create} from "zustand";
import {persist} from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set) => ({
        user: null,
        setUser: (user) => set({user}),
        logout: () => set({user: null}),

        openedContact: null,
        setOpenedContact: (contact) => set({ openedContact: contact }),

        }),
        {
        name: "User-Info",
        }
    )
    );

