// src/pages/CoursesPage.tsx
import React, { useState } from "react";
import { useCourseStore } from "../store/useCourseStore";

const CoursesPage: React.FC = () => {
  const { courses, add, update, remove } = useCourseStore();
  const [name, setName] = useState("");

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Courses</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New course"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 flex-1"
        />
        <button
          onClick={() => {
            if (name.trim()) {
              add(name.trim());
              setName("");
            }
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul>
        {courses.map((course) => (
          <li key={course.id} className="flex justify-between py-2 border-b">
            {course.name}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const newName = prompt("Edit course name", course.name);
                  if (newName) update(course.id, newName);
                }}
                className="text-green-600"
              >
                Edit
              </button>
              <button
                onClick={() => remove(course.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesPage;
