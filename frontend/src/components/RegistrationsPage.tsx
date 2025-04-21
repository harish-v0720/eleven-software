import { useEffect, useState } from "react";
import { useStudentStore } from "../store/useStudentStore";
import { useCourseOfferingStore } from "../store/useCourseOfferingStore";
import { useCourseStore } from "../store/useCourseStore";
import { useCourseTypeStore } from "../store/useCourseTypeStore";

const RegistrationsPage = () => {
  const {
    admin,
    registrations,
    register,
    selectedOfferingId,
    setSelectedOfferingId,
    deleteRegistration,
  } = useStudentStore();

  const { offerings } = useCourseOfferingStore();
  const { courses } = useCourseStore();
  const { courseTypes } = useCourseTypeStore();

  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({
    studentName: "",
    email: "",
    phone: "",
    selected: "",
  });

  useEffect(() => {
    if (selectedOfferingId) {
      setSelected(selectedOfferingId);
      setSelectedOfferingId(null);
    }
  }, [selectedOfferingId, setSelectedOfferingId]);

  const getOfferingLabel = (offeringId: string) => {
    const offering = offerings.find((o) => o.id === offeringId);
    const course = courses.find((c) => c.id === offering?.courseId);
    const type = courseTypes.find((t) => t.id === offering?.typeId);
    return type && course
      ? `${type.name} - ${course.name}`
      : "No course available";
  };

  const validate = () => {
    const newErrors = {
      studentName: "",
      email: "",
      phone: "",
      selected: "",
    };
    let isValid = true;

    if (!studentName.trim()) {
      newErrors.studentName = "Name is required";
      isValid = false;
    }

    if (!email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Valid email is required";
      isValid = false;
    }

    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      newErrors.phone = "Valid 10-digit phone number is required";
      isValid = false;
    }

    if (!selected) {
      newErrors.selected = "Please select a course offering";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = () => {
    if (validate()) {
      register(studentName, email, phone, selected);
      setStudentName("");
      setEmail("");
      setPhone("");
      setSelected("");
      setErrors({ studentName: "", email: "", phone: "", selected: "" });
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  const handleDelete = (registrationId: string) => {
    deleteRegistration(registrationId);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Student Registrations</h1>

      {/* Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-white p-6 rounded shadow-md flex items-center space-x-3">
            <div className="text-green-500 text-3xl">✔</div>
            <p className="text-lg font-semibold">Registered Successfully!</p>
          </div>
        </div>
      )}

      {admin ? (
        <>
          <h2 className="text-lg font-semibold mt-6 mb-2">Registrations</h2>
          <ul>
            {registrations.map((r) => (
              <li key={r.id} className="border-b py-4">
                <div>
                  <strong>Student Name:</strong> {r.studentName}
                </div>
                <div>
                  <strong>Email:</strong> {r.email}
                </div>
                <div>
                  <strong>Phone:</strong> {r.phone}
                </div>
                <div>
                  <strong>Course:</strong> {getOfferingLabel(r.offeringId)}
                </div>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded mt-2 hover:bg-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <input
                type="text"
                placeholder="Student Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="border p-2 w-full"
              />
              {errors.studentName && (
                <p className="text-red-600 text-sm">{errors.studentName}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full"
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border p-2 w-full"
              />
              {errors.phone && (
                <p className="text-red-600 text-sm">{errors.phone}</p>
              )}
            </div>

            <div>
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="border p-2 w-full"
              >
                <option value="">Select Offering</option>
                {offerings.map((o) => (
                  <option key={o.id} value={o.id}>
                    {getOfferingLabel(o.id)}
                  </option>
                ))}
              </select>
              {errors.selected && (
                <p className="text-red-600 text-sm">{errors.selected}</p>
              )}
            </div>
          </div>

          <button
            onClick={handleRegister}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </>
      )}
    </div>
  );
};

export default RegistrationsPage;
