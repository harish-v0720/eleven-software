// src/store/useStudentStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Registration = {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  offeringId: string;
};

type StudentStore = {
  admin: boolean;
  registrations: Registration[];
  selectedOfferingId: string | null;
  register: (
    studentName: string,
    email: string,
    phone: string,
    offeringId: string
  ) => void;
  deleteRegistration: (id: string) => void; // Add delete registration action
  clearAllRegistrations: () => void; // Add clear all registrations action
  setAdmin: (value: boolean) => void;
  setSelectedOfferingId: (id: string | null) => void;
};

export const useStudentStore = create<StudentStore>()(
  persist(
    (set) => ({
      admin: false,
      registrations: [],
      selectedOfferingId: null,
      register: (studentName, email, phone, offeringId) =>
        set((state) => ({
          registrations: [
            ...state.registrations,
            {
              id: crypto.randomUUID(),
              studentName,
              email,
              phone,
              offeringId,
            },
          ],
        })),
      deleteRegistration: (id) =>
        set((state) => ({
          registrations: state.registrations.filter((r) => r.id !== id),
        })),
      clearAllRegistrations: () => set({ registrations: [] }),
      setAdmin: (value) => set({ admin: value }),
      setSelectedOfferingId: (id) => set({ selectedOfferingId: id }),
    }),
    {
      name: "student-registration-storage",
    }
  )
);
