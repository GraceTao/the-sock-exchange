import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Search(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_SOCKS_API_URL}/search`, {
      method: "POST",
      body: JSON.stringify({ searchTerm }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        props.setData(data);

        // link user back to homepage where they can see the search results
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  return (
    <form className="d-flex" role="search" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      
        <button className="btn btn-outline-success" type="submit">
          Search         
        </button>

    </form>
  );
}
