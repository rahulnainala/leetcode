import React from "react";
import { useParams } from "react-router-dom";

const ProblemPage = () => {
  const { problemName } = useParams();
  console.log(problemName);
  return (
    <div>
      <span>{problemName}</span>
      <p>Details about {problemName} will be displayed here.</p>
      {/* You can display more details like problem description, level, etc., as needed */}
    </div>
  );
};

export default ProblemPage;
