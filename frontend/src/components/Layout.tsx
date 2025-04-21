// src/components/Layout.tsx

import { Link, Outlet } from "react-router-dom";
import { useStudentStore } from "../store/useStudentStore";
import { Button } from "./ui/button";
import image from "../assets/course.png";

const Layout = () => {
  const { admin, setAdmin } = useStudentStore();

  const toggleAdminView = () => {
    setAdmin(!admin);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-purple-900 p-4 text-white">
        <div className="flex items-center gap-2 m-2">
          <img src={image} className="h-20 w-20 rounded-4xl" />
          <h1 className="text-xl font-bold text-black mb-2">
            Student Registration System
          </h1>
        </div>

        <nav className="flex justify-between">
          <ul className="flex gap-6">
            <li>
              <Link to="/" className="text-white hover:text-gray-400">
                Course Types
              </Link>
            </li>
            {admin && (
              <li>
                <Link to="/courses" className="text-white hover:text-gray-400">
                  Courses
                </Link>
              </li>
            )}
            <li>
              <Link to="/offerings" className="text-white hover:text-gray-400">
                Offerings
              </Link>
            </li>
            <li>
              <Link
                to="/registrations"
                className="text-white hover:text-gray-400"
              >
                Registrations
              </Link>
            </li>
          </ul>

          <Button
            className="cursor-pointer p-2 bg-black"
            onClick={toggleAdminView}
          >
            {admin ? "Enable Student Panel" : "Enable Admin Panel"}
          </Button>
        </nav>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
