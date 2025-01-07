import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./CardStack.css";

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
    description: "Track a partition of a set into disjoint subsets.",
  },
  {
    name: "Dynamic Programming (DP)",
    description:
      "Solve problems by breaking them into simpler subproblems and storing solutions.",
  },
  {
    name: "Matrix-Based DP",
    description:
      "Dynamic programming problems that can be represented using matrices, often involving tabulation.",
  },
  {
    name: "Advanced DP",
    description: "Optimization problems like knapsack, coin change, etc.",
  },
  {
    name: "Advanced Topics",
    description: "Specialized algorithms for complex computational problems.",
  },
];

const CardStack = () => {
  const navigate = useNavigate();

  const handleCardClick = (ds) => {
    navigate(`/data-structures/${ds.name}`);
  };

  return (
    <div className="card-container">
      <h1 className="text-4xl font-bold">Data Structures Challenges</h1>
      <p className="text-xl font-extralight">
        Organize, track, and review the problems I have solved using Data
        Structures.
      </p>
      <Swiper
        modules={[Navigation, Pagination]}
        direction="horizontal"
        slidesPerView={"3"}
        centeredSlides={true}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        className="card-swiper"
        effect="fade"
      >
        {dataStructures.map((ds) => (
          <SwiperSlide key={ds.name}>
            <div className="card" onClick={() => handleCardClick(ds)}>
              <h2 className="text-2xl">{ds.name}</h2>
              <p className="text-base">{ds.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardStack;
