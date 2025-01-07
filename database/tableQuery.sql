-- Table to store problems
CREATE TABLE problems (
    id SERIAL PRIMARY KEY,
    problem_name VARCHAR(100) NOT NULL,
    dataStructure_level VARCHAR(50) NOT NULL,
    leetcode_link VARCHAR(255) NOT NULL,
    dataStructure VARCHAR(50),
    code_description TEXT NOT NULL,
    code TEXT NOT NULL
);
