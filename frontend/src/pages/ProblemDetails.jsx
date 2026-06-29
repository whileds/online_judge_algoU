import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProblem } from "../services/problemApi";
import Compiler from "../components/Compiler";
function ProblemDetails() {

    const { id } = useParams();

    const [problem, setProblem] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchProblem();

    }, []);

    const fetchProblem = async () => {

        try {

            const res = await getProblem(id);

            setProblem(res.data.problem);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <>
                <Navbar />
                <h1 className="text-center mt-10 text-3xl">
                    Loading...
                </h1>
            </>
        );

    }

    return (

        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 p-8">

                <div className="bg-white shadow-lg rounded-xl p-8">

                    <h1 className="text-4xl font-bold">

                        {problem.title}

                    </h1>

                    <span
                        className={`inline-block mt-4 px-4 py-2 rounded-full text-white
                        ${problem.difficulty === "Easy"
                                ? "bg-green-500"
                                : problem.difficulty === "Medium"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                            }`}
                    >
                        {problem.difficulty}
                    </span>

                    <div className="mt-8">

                        <h2 className="text-2xl font-semibold mb-2">

                            Description

                        </h2>

                        <p>

                            {problem.description}

                        </p>

                    </div>

                    <div className="mt-8">

                        <h2 className="text-2xl font-semibold mb-2">

                            Constraints

                        </h2>

                        <p>

                            {problem.constraints}

                        </p>

                    </div>

                    <div className="mt-8">

                        <h2 className="text-2xl font-semibold mb-4">

                            Examples

                        </h2>

                        {

                            problem.examples.map((example, index) => (

                                <div
                                    key={index}
                                    className="bg-gray-100 p-4 rounded-lg mb-4"
                                >

                                    <p>

                                        <strong>Input:</strong>

                                        {example.input}

                                    </p>

                                    <p>

                                        <strong>Output:</strong>

                                        {example.output}

                                    </p>

                                    <p>

                                        <strong>Explanation:</strong>

                                        {example.explanation}

                                    </p>

                                </div>

                            ))

                        }

                    </div>
                    <div className="mt-10">
                        <Compiler />
                    </div>

                </div>

            </div>

        </>

    );

}

export default ProblemDetails;