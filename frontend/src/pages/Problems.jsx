import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProblems } from "../services/problemApi";

function Problems() {

  const [problems, setProblems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    fetchProblems();

  }, []);

  const fetchProblems = async () => {

    try {

      const res = await getProblems();

      setProblems(res.data.problems);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const filteredProblems = problems.filter((problem) =>
    problem.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Problems
        </h1>

        <input
          type="text"
          placeholder="Search Problem..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-8 border rounded-lg p-3"
        />

        {loading ? (

          <h2>Loading...</h2>

        ) : (

          <div className="space-y-4">

            {filteredProblems.map((problem) => (

              <div
                key={problem._id}
                className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center"
              >

                <div>

                  <h2 className="text-2xl font-semibold">

                    {problem.title}

                  </h2>

                  <p className="text-gray-600 mt-2">

                    {problem.difficulty}

                  </p>

                </div>

                <button
                  onClick={() =>
                    navigate(`/problem/${problem._id}`)
                  }
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                >

                  Solve

                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </>
  );
}

export default Problems;