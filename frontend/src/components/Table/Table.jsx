import "./Table.css";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Table = ({ dataStructure }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const apiCall = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/problems/${dataStructure.name}`
        );
        console.log(response);
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };
    apiCall();
  }, []);

  const filteredData = tableData.filter(
    (row) => row.datastructure === dataStructure.name
  );

  return (
    <div className="table-container">
      <h3>{dataStructure.name} DB</h3>
      {filteredData.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>Problem Name</th>
              <th>Level</th>
              <th>LeetCode Link</th>
              <th>Solution</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(
              (row) => (
                console.log(row),
                (
                  <tr key={row.id}>
                    <td>{row.problem_name}</td>
                    <td>{row.datastructure_level}</td>
                    <td>
                      <a
                        href={row.leetcode_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Go to Problem
                      </a>
                    </td>
                    <td>
                      <Link to={`/problem/${row.problem_name}`}>
                        <button>Go to Problem Page</button>
                      </Link>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      ) : (
        <p>No problems found for {dataStructure.name}.</p>
      )}
    </div>
  );
};

export default Table;
