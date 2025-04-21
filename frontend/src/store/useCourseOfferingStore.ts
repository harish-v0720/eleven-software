// src/stores/useOfferingStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Offering = {
  id: string;
  courseId: string;
  typeId: string;
};

type OfferingStore = {
  offerings: Offering[];
  add: (courseId: string, typeId: string) => void;
  update: (id: string, newCourseId: string, newTypeId: string) => void;
  remove: (id: string) => void;
};

export const useCourseOfferingStore = create<OfferingStore>()(
  persist(
    (set) => ({
      offerings: [],
      add: (courseId, typeId) =>
        set((state) => ({
          offerings: [
            ...state.offerings,
            { id: crypto.randomUUID(), courseId, typeId },
          ],
        })),
      update: (id, newCourseId, newTypeId) =>
        set((state) => ({
          offerings: state.offerings.map((o) =>
            o.id === id ? { ...o, courseId: newCourseId, typeId: newTypeId } : o
          ),
        })),
      remove: (id) =>
        set((state) => ({
          offerings: state.offerings.filter((o) => o.id !== id),
        })),
    }),
    {
      name: "offering-storage",
    }
  )
);
