import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-10">

        <h1 className="text-4xl font-bold mb-2">
          Welcome, {user?.firstName} 👋
        </h1>

        <p className="text-gray-600 mb-8">
          Ready to solve today's coding challenge?
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-lg font-semibold">
              Problems Solved
            </h2>

            <p className="text-4xl font-bold mt-4 text-blue-600">
              0
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-lg font-semibold">
              Submissions
            </h2>

            <p className="text-4xl font-bold mt-4 text-green-600">
              0
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-lg font-semibold">
              Acceptance
            </h2>

            <p className="text-4xl font-bold mt-4 text-yellow-600">
              0%
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-lg font-semibold">
              AI Reviews
            </h2>

            <p className="text-4xl font-bold mt-4 text-red-600">
              0
            </p>
          </div>

        </div>

        <div className="flex gap-6 mt-10">

          <button
            onClick={() => navigate("/problems")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            Solve Problems
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="bg-gray-800 hover:bg-black text-white px-8 py-3 rounded-lg"
          >
            View Profile
          </button>

        </div>

      </div>
    </>
  );
}

export default Dashboard;