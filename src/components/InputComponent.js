import React, { useState } from "react";
import axios from "axios";

const InputComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.includes(" ")) {
      setError("Spaces are not allowed.");
    } else {
      setInputValue(value);
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (!inputValue) {
      setError("Please enter a token.");
      return;
    }
   
    try {
      const response = await axios.post("http://localhost:3000", {
        token: inputValue,
      });
      setResponse(response.data);
      setInputValue("");
      setError("");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError("Token already exists.");
      } else {
        console.error("Error submitting token:", error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="class1">
      <h1>Enter Token</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter Token"
        required
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <div>
          <h4>Token Created Successfully..</h4>
          <h5>Last Token Created:</h5>
          <h5>Token: {response.token}</h5>
          <h5>ID: {response._id}</h5>
        </div>
      )}
    </div>
  );
};

export default InputComponent;
