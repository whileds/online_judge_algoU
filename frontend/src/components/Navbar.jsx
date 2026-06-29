import { Link, useNavigate } from "react-router-dom";
import { FaCode } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        {/* Logo */}

        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-2xl font-bold"
        >
          <FaCode />
          AlgoU OJ
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-8">

          <Link
            to="/dashboard"
            className="hover:text-blue-400 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/problems"
            className="hover:text-blue-400 transition"
          >
            Problems
          </Link>

          <Link
            to="/profile"
            className="hover:text-blue-400 transition"
          >
            Profile
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="hover:text-blue-400 transition"
            >
              Admin
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;