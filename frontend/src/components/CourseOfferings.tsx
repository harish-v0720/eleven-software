import React, { useMemo, useState } from "react";
import { useCourseOfferingStore } from "../store/useCourseOfferingStore";
import { useCourseStore } from "../store/useCourseStore";
import { useCourseTypeStore } from "../store/useCourseTypeStore";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useStudentStore } from "../store/useStudentStore";
import { useNavigate, useSearchParams } from "react-router-dom";

const CourseOfferings = () => {
  const { admin, setSelectedOfferingId } = useStudentStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedTypeIdParam = searchParams.get("typeId");

  const { courseTypes } = useCourseTypeStore();
  const { courses } = useCourseStore();
  const { offerings, add, update, remove } = useCourseOfferingStore();

  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedCourseId && selectedTypeId) {
      if (editingId) {
        update(editingId, selectedCourseId, selectedTypeId);
        setEditingId(null);
      } else {
        add(selectedCourseId, selectedTypeId);
      }
      setSelectedCourseId("");
      setSelectedTypeId("");
    }
  };

  const handleEdit = (id: string, courseId: string, typeId: string) => {
    setEditingId(id);
    setSelectedCourseId(courseId);
    setSelectedTypeId(typeId);
  };

  const filteredOfferings = useMemo(() => {
    return selectedTypeIdParam
      ? offerings.filter((o) => o.typeId === selectedTypeIdParam)
      : offerings;
  }, [selectedTypeIdParam, offerings]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Course Offerings</h1>

      {admin ? (
        <>
          <div className="flex gap-2 mb-4">
            <select
              value={selectedTypeId}
              onChange={(e) => setSelectedTypeId(e.target.value)}
              className="border p-2 flex-1"
            >
              <option value="">Select Course Type</option>
              {courseTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>

            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="border p-2 flex-1"
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {editingId ? "Update" : "Add"}
            </button>

            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setSelectedCourseId("");
                  setSelectedTypeId("");
                }}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>

          <ul>
            {filteredOfferings.map((off) => {
              const course = courses.find((c) => c.id === off.courseId);
              const type = courseTypes.find((t) => t.id === off.typeId);
              return (
                <li
                  key={off.id}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <span>
                    {type?.name} - {course?.name}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleEdit(off.id, off.courseId, off.typeId)
                      }
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(off.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOfferings.map((off) => {
            const course = courses.find((c) => c.id === off.courseId);
            const type = courseTypes.find((t) => t.id === off.typeId);
            return (
              <Card
                key={off.id}
                className="bg-white text-gray-900 transition-transform hover:scale-105 hover:shadow-xl duration-300"
              >
                <CardHeader className="text-center font-bold text-2xl border border-purple-500 rounded-lg m-6 bg-white">
                  {type?.name.toUpperCase()}
                </CardHeader>
                <CardContent className="text-center text-lg font-semibold">
                  {course?.name}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    onClick={() => {
                      setSelectedOfferingId(off.id); // store selected offering
                      navigate("/registrations"); // navigate to registrations page
                    }}
                    className="text-yellow-400 border border-white bg-gray-900 mx-auto cursor-pointer"
                  >
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseOfferings;
