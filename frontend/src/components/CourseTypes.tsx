import { useState } from "react";
import { useCourseTypeStore } from "../store/useCourseTypeStore";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useStudentStore } from "../store/useStudentStore";

const CourseTypes = () => {
  const { admin } = useStudentStore();
  const navigate = useNavigate();
  const { courseTypes, add, update, remove } = useCourseTypeStore();
  const [name, setName] = useState("");

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Course Types</h1>

      {admin ? (
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="New course type"
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
            className="bg-purple-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Add
          </button>
        </div>
      ) : null}

      <div>
        {admin ? (
          <ul>
            {courseTypes.map((type) => (
              <li key={type.id} className="flex justify-between py-2 border-b">
                {type.name}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const newName = prompt("Edit name", type.name);
                      if (newName) update(type.id, newName);
                    }}
                    className="text-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(type.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courseTypes.map((type) => (
              <Card
                key={type.id}
                className="bg-white text-gray-900 transition-transform hover:scale-105 hover:shadow-xl duration-300"
              >
                <CardHeader className="text-center font-bold text-2xl border border-purple-500 rounded-lg m-6 bg-white">
                  {type.name.toUpperCase()}
                </CardHeader>
                <CardContent>
                  {/* You can add more info if needed */}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    className="text-yellow-400 border border-white bg-gray-900 mx-auto cursor-pointer"
                    onClick={() => navigate(`/offerings?typeId=${type.id}`)}
                  >
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseTypes;
