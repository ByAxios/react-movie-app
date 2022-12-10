import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import SearchIcon from "./logo.svg";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false)
  useEffect(() => {
    searchMovies("Batman");
    console.log(searchMovies("Batman"));
  }, []);

 

  const searchMovies = async (title) => {
    setIsLoading(true)
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    
    setMovies(data.Search);
    setIsLoading(false)
  };

  const handler = (event) => {
    console.log(event.code);
    if (event.code === "Enter" || event.code === "NumpadEnter") {
     
      searchMovies(searchTerm)
    }
  }
  
  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
          onKeyPress={(e) => handler(e)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {isLoading? <div className="loader"></div>:""}
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;