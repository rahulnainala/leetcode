import React, { useEffect, useState } from "react";
import "./DataStructureDetails.css";
import Table from "../components/Table";
import { useNavigate, useParams } from "react-router-dom";

const dataStructures = [
  {
    name: "Arrays",
    description: "Collection of elements in contiguous memory",
  },
  { name: "Strings", description: "Sequence of characters" },
  { name: "Hashing", description: "Technique to map keys to values" },
  {
    name: "Sorting and Searching",
    description: "Algorithms for organizing data",
  },
  { name: "Linked Lists", description: "Linear data structure using nodes" },
  {
    name: "Stacks and Queues",
    description:
      "LIFO (Last In, First Out) and FIFO (First In, First Out) data structures",
  },
  {
    name: "Trees",
    description: "Hierarchical data structure with nodes connected by edges",
  },
  {
    name: "Heaps and Priority Queues",
    description:
      "Binary trees used for efficient retrieval of the largest or smallest element",
  },
  {
    name: "Graphs Basics",
    description:
      "Collection of nodes (vertices) and edges connecting pairs of nodes",
  },
  {
    name: "Advanced Graphs",
    description:
      "Advanced graph algorithms like Dijkstra, Bellman-Ford, and A* for optimization and shortest paths",
  },
  {
    name: "Union Find",
    description:
      "Data structure to track a partition of a set into disjoint subsets",
  },
  {
    name: "Dynamic Programming (DP)",
    description:
      "Method for solving problems by breaking them down into simpler subproblems and storing their solutions",
  },
  {
    name: "Matrix-Based DP",
    description:
      "Dynamic programming problems that can be represented using matrices, often involving tabulation",
  },
  {
    name: "Advanced DP",
    description:
      "Advanced dynamic programming techniques involving optimization problems like knapsack, coin change, etc",
  },
  {
    name: "Advanced Topics",
    description:
      "Specialized algorithms and techniques for solving complex computational problems",
  },
];
const dataStructuresObj = Object.fromEntries(
  dataStructures.map((ds) => [ds.name, ds])
);
const DataStructureDetails = () => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [isMobile, setIsMobile] = useState(false);
  const { name } = useParams();
  const navigate = useNavigate();
  const dataStructure = dataStructuresObj[name];
  if (!dataStructure) {
    return <p>Data structure not found.</p>;
  }

  return (
    <>
      {isMobile && (
        <div className="mobile-alert">
          <p>Please switch to desktop mode for the best experience.</p>
        </div>
      )}
      <div className="flex justify-end">
        <button
          className="flex flex-row items-center px-4 py-2 bg-custom-brown text-white font-semibold rounded-full hover:bg-custom-orange focus:outline-none"
          onClick={() => navigate("/")}
        >
          Back Home
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14m0 0l-7 7m7-7l-7-7"
            />
          </svg>
        </button>
      </div>
      <div className="details-container">
        <span className="text-3xl">{dataStructure.name}</span>
        <br />
        <span className="text-xl">{dataStructure.description}</span>
        <br />
        <Table dataStructure={dataStructure} />
      </div>
    </>
  );
};

export default DataStructureDetails;
