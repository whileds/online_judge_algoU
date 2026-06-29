import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { createProblem,getProblems,deleteProblem,updateProblem } from "../services/adminProblemApi";

function AdminDashboard() {

    const [form, setForm] = useState({
        title: "",
        description: "",
        difficulty: "Easy",
        constraints: "",
    });
    const [examples, setExamples] = useState([
    {
        input: "",
        output: "",
        explanation: ""
    }
]);

const [testCases, setTestCases] = useState([
    {
        input: "",
        output: ""
    }
]);
    const [problems, setProblems] = useState([]);

    const [editingId, setEditingId] = useState(null);
const handleChange = (e) => {

    setForm({
        ...form,
        [e.target.name]: e.target.value
    });

};
    const handleExampleChange = (index, field, value) => {

    const temp = [...examples];
    temp[index][field] = value;
    setExamples(temp);

};

const addExample = () => {

    setExamples([
        ...examples,
        {
            input: "",
            output: "",
            explanation: ""
        }
    ]);

};

const handleTestCaseChange = (index, field, value) => {

    const temp = [...testCases];
    temp[index][field] = value;
    setTestCases(temp);

};

const addTestCase = () => {

    setTestCases([
        ...testCases,
        {
            input: "",
            output: ""
        }
    ]);

};

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const payload = {

    ...form,

    examples,

    testCases

};

if (editingId) {

    await updateProblem(editingId, payload);

    alert("Problem Updated Successfully");

} else {

    await createProblem(payload);

    alert("Problem Created Successfully");

}


            // alert("Problem Created Successfully");
            // fetchProblems();
            setForm({
                title: "",
                description: "",
                difficulty: "Easy",
                constraints: ""
            });
           setExamples([
    {
        input: "",
        output: "",
        explanation: ""
    }
]);

setTestCases([
    {
        input: "",
        output: ""
    }
]);

setEditingId(null);

fetchProblems();
        }

        catch (err) {

            alert(err.response?.data?.message || "Error");

        }

    };
   const fetchProblems = async () => {

    try {

        const { data } = await getProblems();

        setProblems(data.problems);

    } catch (err) {

        console.log(err);

    }

};
const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this problem?"
    );

    if (!confirmDelete) return;

    try {

        await deleteProblem(id);

        alert("Problem Deleted Successfully");

        fetchProblems();

    } catch (err) {

        alert(
            err.response?.data?.message ||
            "Failed to delete problem"
        );

    }

};

useEffect(() => {

    fetchProblems();

}, []);
    return (

        <>
            <Navbar />

            <div className="max-w-4xl mx-auto mt-10">

                <h1 className="text-4xl font-bold mb-8">

                    Admin Dashboard

                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-lg rounded-xl p-8 space-y-6"
                >

                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Problem Title"
                        className="w-full border p-3 rounded-lg"
                    />

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full border p-3 rounded-lg"
                    />

                    <select
                        name="difficulty"
                        value={form.difficulty}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    >

                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>

                    </select>

                    <textarea
                        name="constraints"
                        value={form.constraints}
                        onChange={handleChange}
                        placeholder="Constraints"
                        className="w-full border p-3 rounded-lg"
                    />
                     <h2 className="text-2xl font-semibold mt-6">
    Examples
</h2>

{
    examples.map((example, index) => (

        <div
            key={index}
            className="border rounded-lg p-4 space-y-3"
        >

            <input
                placeholder="Input"
                value={example.input}
                onChange={(e)=>handleExampleChange(index,"input",e.target.value)}
                className="w-full border p-2 rounded"
            />

            <input
                placeholder="Output"
                value={example.output}
                onChange={(e)=>handleExampleChange(index,"output",e.target.value)}
                className="w-full border p-2 rounded"
            />

            <textarea
                placeholder="Explanation"
                value={example.explanation}
                onChange={(e)=>handleExampleChange(index,"explanation",e.target.value)}
                className="w-full border p-2 rounded"
            />

        </div>

    ))
}

<button
    type="button"
    onClick={addExample}
    className="bg-green-600 text-white px-4 py-2 rounded"
>
    + Add Example
</button>
<h2 className="text-2xl font-semibold mt-8">
    Hidden Test Cases
</h2>

{
    testCases.map((testCase,index)=>(

        <div
            key={index}
            className="border rounded-lg p-4 space-y-3"
        >

            <input
                placeholder="Input"
                value={testCase.input}
                onChange={(e)=>handleTestCaseChange(index,"input",e.target.value)}
                className="w-full border p-2 rounded"
            />

            <input
                placeholder="Expected Output"
                value={testCase.output}
                onChange={(e)=>handleTestCaseChange(index,"output",e.target.value)}
                className="w-full border p-2 rounded"
            />

        </div>

    ))
}

<button
    type="button"
    onClick={addTestCase}
    className="bg-purple-600 text-white px-4 py-2 rounded"
>
    + Add Test Case
</button>
<br />
                    <button
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg"
                    >

                         {editingId ? "Update Problem" : "Create Problem"}

                    </button>
                  
                </form>
              <div className="mt-12">

    <h2 className="text-3xl font-bold mb-6">

        All Problems

    </h2>

    <div className="overflow-x-auto">

        <table className="min-w-full bg-white rounded-xl shadow-lg">

            <thead>

                <tr className="bg-gray-200">

                    <th className="py-3 px-4 text-left">
                        Title
                    </th>

                    <th className="py-3 px-4 text-left">
                        Difficulty
                    </th>

                    <th className="py-3 px-4 text-center">
                        Actions
                    </th>

                </tr>

            </thead>

            <tbody>

                {
                    problems.map((problem) => (

                        <tr
                            key={problem._id}
                            className="border-b"
                        >

                            <td className="py-3 px-4">

                                {problem.title}

                            </td>

                            <td className="py-3 px-4">

                                <span
                                    className={`px-3 py-1 rounded-full text-white
                                    ${
                                        problem.difficulty==="Easy"
                                        ?"bg-green-500"
                                        :problem.difficulty==="Medium"
                                        ?"bg-yellow-500"
                                        :"bg-red-500"
                                    }`}
                                >

                                    {problem.difficulty}

                                </span>

                            </td>

                            <td className="py-3 px-4 text-center">

                                <button
                                    type="button"
    onClick={() => {

        setEditingId(problem._id);

        setForm({
            title: problem.title,
            description: problem.description,
            difficulty: problem.difficulty,
            constraints: problem.constraints
        });

        setExamples(problem.examples || []);

        setTestCases(problem.testCases || []);

    }}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2"
                                >
                                    Edit
                                </button>

                                <button
                                     type="button"
                                     onClick={() => handleDelete(problem._id)}
                                     className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))
                }

            </tbody>

        </table>

    </div>

</div>
            </div>

        </>

    );

}

export default AdminDashboard;