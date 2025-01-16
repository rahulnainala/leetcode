import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";

// Register the JavaScript language for syntax highlighting
SyntaxHighlighter.registerLanguage("javascript", js);

const ProblemPage = () => {
  const { problemName } = useParams();
  const [problemDetails, setProblemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/problem/${problemName}`
        );
        setProblemDetails(response.data);
      } catch (err) {
        setError("Error fetching problem details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblemDetails();
  }, [problemName]);

  if (loading) return <p className="text-center text-gray-300">Loading...</p>;
  if (error) return <p className="text-center text-red-300">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-transparent h-full overflow-y-auto flex flex-col">
      <h1 className="text-5xl font-bold mb-4 text-white">
        {problemDetails.problem_name}
      </h1>
      <div className="flex py-3 justify-between items-center mb-4">
        <p className="text-xl text-gray-300">
          Level:{" "}
          <span
            className={`text-xl font-semibold ${
              problemDetails.datastructure_level === "Easy"
                ? "text-green-500"
                : problemDetails.datastructure_level === "Medium"
                ? "text-orange-500"
                : "text-red-500"
            }`}
          >
            {problemDetails.datastructure_level}
          </span>
        </p>
        <p className="text-xl text-gray-300">
          Data Structure:{" "}
          <span className="text-xl font-semibold text-white">
            {problemDetails.datastructure}
          </span>
        </p>
      </div>
      <p className="mb-4 text-xl">
        <button
          onClick={() =>
            window.open(
              problemDetails.leetcode_link,
              "_blank",
              "noopener,noreferrer"
            )
          }
          className="text-xl hover:bg-custom-brown mb-1 flex items-center"
        >
          LeetCode Link <ArrowOutwardIcon className="ml-2" />
        </button>
      </p>
      <span className="mb-4 text-xl text-gray-300">Solution: </span>
      <div className="bg-transparent shadow rounded-lg p-6 border border-gray-700 text-xl mb-6">
        <Markdown remarkPlugins={[remarkGfm]} className="prose prose-invert">
          {problemDetails.code_description}
        </Markdown>
      </div>
      <span className="mb-4 text-xl text-gray-300">Code Functionality: </span>
      <div className="bg-transparent shadow rounded-lg p-6 border border-gray-700">
        <SyntaxHighlighter language="javascript" style={tomorrowNight}>
          {problemDetails.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default ProblemPage;
