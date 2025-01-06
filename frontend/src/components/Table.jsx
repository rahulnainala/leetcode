import "./Table.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Table = ({ dataStructure }) => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let apiCall = async () => {
      let response = await axios.get("http://localhost:8000/api/problems");
      setTableData(response.data);
    };
    apiCall();
  }, []);

  return (
    <div className="table-container">
      <h3>{dataStructure.name} Operations</h3>
      {tableData.length > 0 ? (
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
            {tableData.map(
              (row) => (
                console.log(row),
                (
                  <tr key={row.id}>
                    <td>{row.problem_name}</td>
                    <td>{row.level}</td>
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
        <p>Loading Problems ...</p>
      )}
    </div>
  );
};

export default Table;
