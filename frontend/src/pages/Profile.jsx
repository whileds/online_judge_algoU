import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Profile() {

   const { user, logout } = useAuth();

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 p-8">

                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

                    <h1 className="text-4xl font-bold mb-8">
                        My Profile
                    </h1>

                    <div className="space-y-6">

                        <div>
                            <p className="text-gray-500">First Name</p>
                            <h2 className="text-2xl font-semibold">
                                {user?.firstName}
                            </h2>
                        </div>

                        <div>
                            <p className="text-gray-500">Last Name</p>
                            <h2 className="text-2xl font-semibold">
                                {user?.lastName}
                            </h2>
                        </div>

                        <div>
                            <p className="text-gray-500">Email</p>
                            <h2 className="text-xl">
                                {user?.email}
                            </h2>
                        </div>

                        <div>
                            <p className="text-gray-500">Role</p>

                            <span
                                className={`px-4 py-2 rounded-full text-white ${
                                    user?.role === "admin"
                                        ? "bg-red-600"
                                        : "bg-blue-600"
                                }`}
                            >
                                {user?.role}
                            </span>

                        </div>

                    </div>

                    <button
                        onClick={logout}
                        className="mt-10 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
                    >
                        Logout
                    </button>

                </div>

            </div>
        </>
    );
}

export default Profile;