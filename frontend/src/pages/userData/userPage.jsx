import "./userPage.css";
import React from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useForm } from "react-hook-form";
import { AlertTitle } from "@mui/material";

const UserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post("post url here", data);
      if (response.status === 201) {
        <Alert variant="filled" severity="success" onClose={() => {}}>
          <AlertTitle>Success</AlertTitle>
          Problem Added Successfully
        </Alert>;
        reset();
      }
    } catch (err) {
      console.error("Error adding problem:", err);
      <Alert variant="filled" severity="error" onClose={() => {}}>
        <AlertTitle>Error</AlertTitle>
        Failed to Add the Problem
      </Alert>;
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-3xl text-center mb-5">Add a Problem</h2>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label>
            Problem Name <span className="required">*</span>
          </label>
          <input
            type="text"
            className={errors.problem_name ? "error-input" : ""}
            {...register("problem_name", {
              required: "Problem name is required",
            })}
          />
          {errors.problem_name && (
            <p className="error-text">{errors.problem_name.message}</p>
          )}
        </div>

        <div className="mb-5">
          <label>
            Data Structure Level <span className="required">*</span>
          </label>
          <select
            {...register("dataStructure_level", {
              required: "Please select a difficulty level",
            })}
          >
            <option value="">Select Level</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          {errors.dataStructure_level && (
            <p className="error-text">{errors.dataStructure_level.message}</p>
          )}
        </div>

        <div className="mb-5">
          <label>
            LeetCode Link <span className="required">*</span>
          </label>
          <input
            type="url"
            className={errors.leetcode_link ? "error-input" : ""}
            {...register("leetcode_link", {
              required: "LeetCode link is required",
              pattern: {
                value: /^(https?:\/\/)?(www\.)?leetcode\.com\/.+$/,
                message: "Enter a valid LeetCode URL",
              },
            })}
          />
          {errors.leetcode_link && (
            <p className="error-text">{errors.leetcode_link.message}</p>
          )}
        </div>

        <div className="mb-5">
          <label>
            Data Structure <span className="required">*</span>
          </label>
          <select
            {...register("dataStructure", {
              required: "Data structure is required",
            })}
          >
            <option value="">Select DataStructure</option>
            <option value="Arrays">Arrays</option>
            <option value="Strings">Strings</option>
            <option value="Hashing">Hashing</option>
            <option value="Sorting and Searching">Sorting and Searching</option>
            <option value="Linked Lists">Linked Lists</option>
            <option value="Stacks">Stacks</option>
            <option value="Queues">Queues</option>
            <option value="Trees">Trees</option>
            <option value="Heaps">Heaps</option>
            <option value="Graphs">Graphs</option>
            <option value="Tries">Tries</option>
            <option value="Dynamic Programming">Dynamic Programming</option>
          </select>
          {errors.dataStructure && (
            <p className="error-text">{errors.dataStructure.message}</p>
          )}
        </div>

        <div className="mb-5">
          <label>
            Markdown Description <span className="required">*</span>
          </label>
          <textarea
            className={errors.code_description ? "error-input" : ""}
            {...register("code_description", {
              required: "Markdown description is required",
            })}
          />
          {errors.code_description && (
            <p className="error-text">{errors.code_description.message}</p>
          )}
        </div>

        <div className="mb-5">
          <label>
            JavaScript Code <span className="required">*</span>
          </label>
          <textarea
            className={errors.code ? "error-input" : ""}
            {...register("code", { required: "JavaScript code is required" })}
          />
          {errors.code && <p className="error-text">{errors.code.message}</p>}
        </div>

        <button type="submit" className="submit-button">
          Add Problem
        </button>
      </form>
    </div>
  );
};

export default UserPage;
