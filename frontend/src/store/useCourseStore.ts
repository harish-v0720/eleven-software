// src/stores/useCourseStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Course = {
  id: string;
  name: string;
};

type CourseStore = {
  courses: Course[];
  add: (name: string) => void;
  update: (id: string, name: string) => void;
  remove: (id: string) => void;
};

export const useCourseStore = create<CourseStore>()(
  persist(
    (set) => ({
      courses: [],
      add: (name) =>
        set((state) => ({
          courses: [...state.courses, { id: crypto.randomUUID(), name }],
        })),
      update: (id, name) =>
        set((state) => ({
          courses: state.courses.map((c) => (c.id === id ? { ...c, name } : c)),
        })),
      remove: (id) =>
        set((state) => ({
          courses: state.courses.filter((c) => c.id !== id),
        })),
    }),
    {
      name: "course-storage",
    }
  )
);
