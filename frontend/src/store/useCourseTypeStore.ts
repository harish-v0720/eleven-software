import { create } from "zustand";
import { persist } from "zustand/middleware";

type CourseType = {
  id: string;
  name: string;
};

type Store = {
  courseTypes: CourseType[];
  add: (name: string) => void;
  update: (id: string, name: string) => void;
  remove: (id: string) => void;
};

export const useCourseTypeStore = create<Store>()(
  persist(
    (set) => ({
      courseTypes: [],
      add: (name) =>
        set((state) => ({
          courseTypes: [
            ...state.courseTypes,
            { id: crypto.randomUUID(), name },
          ],
        })),
      update: (id, name) =>
        set((state) => ({
          courseTypes: state.courseTypes.map((item) =>
            item.id === id ? { ...item, name } : item
          ),
        })),
      remove: (id) =>
        set((state) => ({
          courseTypes: state.courseTypes.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "course-types-storage", // localStorage key
    }
  )
);
