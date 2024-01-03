import React, { useState } from "react";
import MovieDetailsModel from "./MovieDetailsModel";
import "../styles/moviedetailsmodel.css";

const MovieCard = ({ movies, fetchSearchMovies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const handleClick = (movieId) => {
    setSelectedMovie(movieId);
  };

  return (
    <div className="movie-list">
      {fetchSearchMovies && fetchSearchMovies.length > 0
        ? fetchSearchMovies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => handleClick(movie.id)}
            >
              <div className="overlay">
                <img
                  src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-details">
                  <p className="movie-title">{movie.title}</p>
                  <p className="rating">Rating: {movie.vote_average}</p>
                </div>
              </div>
            </div>
          ))
        : movies &&
          movies.map(
            (yearData) =>
              yearData.year < new Date().getFullYear() && (
                <div key={yearData.year}>
                  <h2 className="year-header">{yearData && yearData.year}</h2>
                  {yearData.movies.map((movie) => (
                    <div
                      key={movie.id}
                      className="movie-card"
                      onClick={() => handleClick(movie.id)}
                    >
                      <div className="overlay">
                        <img
                          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                          alt={movie.title}
                          className="movie-poster"
                        />
                        <div className="movie-details">
                          <p className="movie-title">{movie.title}</p>
                          <p className="rating">Rating: {movie.vote_average}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
          )}
      {selectedMovie && (
        <MovieDetailsModel
          movieId={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default MovieCard;
