import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">

      <h1 className="text-5xl font-bold">
        AlgoU Online Judge
      </h1>

      <p className="mt-5 text-gray-600">
        Practice Coding. Improve Skills.
      </p>

      <div className="mt-10 flex gap-5">

        <Link
          to="/login"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="bg-green-600 text-white px-5 py-2 rounded-lg"
        >
          Signup
        </Link>

      </div>

    </div>
  );
}

export default Home;