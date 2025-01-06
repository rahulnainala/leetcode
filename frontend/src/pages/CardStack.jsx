import "./CardStack.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const dataStructures = [
  {
    name: "Arrays",
    description: "Collection of elements in contiguous memory.",
  },
  { name: "Strings", description: "Sequence of characters." },
  { name: "Hashing", description: "Technique to map keys to values." },
  {
    name: "Sorting and Searching",
    description: "Algorithms for organizing data.",
  },
  { name: "Linked Lists", description: "Linear data structure using nodes." },
  {
    name: "Stacks and Queues",
    description:
      "LIFO (Last In, First Out) and FIFO (First In, First Out) data structures.",
  },
  {
    name: "Trees",
    description: "Hierarchical data structure with nodes connected by edges.",
  },
  {
    name: "Heaps and Priority Queues",
    description:
      "Binary trees used for efficient retrieval of the largest or smallest element.",
  },
  {
    name: "Graphs Basics",
    description:
      "Collection of nodes (vertices) and edges connecting pairs of nodes.",
  },
  {
    name: "Advanced Graphs",
    description:
      "Advanced graph algorithms like Dijkstra, Bellman-Ford, and A* for optimization and shortest paths.",
  },
  {
    name: "Union Find",
    description:
      "Data structure to track a partition of a set into disjoint subsets.",
  },
  {
    name: "Dynamic Programming (DP)",
    description:
      "Method for solving problems by breaking them down into simpler subproblems and storing their solutions.",
  },
  {
    name: "Matrix-Based DP",
    description:
      "Dynamic programming problems that can be represented using matrices, often involving tabulation.",
  },
  {
    name: "Advanced DP",
    description:
      "Advanced dynamic programming techniques involving optimization problems like knapsack, coin change, etc.",
  },
  {
    name: "Advanced Topics",
    description:
      "Specialized algorithms and techniques for solving complex computational problems.",
  },
];

const CardStack = () => {
  const navigate = useNavigate();

  const handleCardClick = (ds) => {
    navigate(`/data-structures/${ds.name}`);
  };

  return (
    <div className="card-container">
      <span className="text-3xl font-bold">Data Structures Challenges</span>
      <br />
      <span className="text-base font-extralight">
        Organize, track, and review the problems i have solved using Data
        Structures.
      </span>
      <div className="card-stack-container">
        {/* Updated this class */}
        {dataStructures.map((ds) => (
          <div
            key={ds.name}
            className="card"
            onClick={() => handleCardClick(ds)}
          >
            <span className="text-2xl">{ds.name}</span>
            <span className="text-base">{ds.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardStack;
