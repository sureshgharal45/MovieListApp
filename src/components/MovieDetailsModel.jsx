import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const MovieDetailsModel = ({ movieId, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const modalRef = useRef();
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        //fetch single movie details
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: {
              api_key: "2dca580c2a14b55200e784d157207b4d",
            },
          }
        );

        //fetch cast and crews members from credit endpoint
        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            params: {
              api_key: "2dca580c2a14b55200e784d157207b4d",
            },
          }
        );

        const filterByKnownDepartment = (list, department) =>
          list.filter((item) => item.known_for_department === department);

        const castActors = filterByKnownDepartment(
          creditsResponse.data.cast,
          "Acting"
        );
        const crewDirectors = filterByKnownDepartment(
          creditsResponse.data.crew,
          "Directing"
        );

        //combining the results from fetching single movie details and fetching credits endpoint
        const details = {
          title: movieResponse.data.title,
          posterPath: movieResponse.data.poster_path,
          genres: movieResponse.data.genres,
          cast: castActors, //Acting
          crew: crewDirectors, //Directing
          overview: movieResponse.data.overview,
        };

        setMovieDetails(details);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" ref={modalRef}>
        {/* Close button */}
        <button onClick={onClose}>Close</button>

        {/* Display movie details */}
        {movieDetails && (
          <div>
            <h2>{movieDetails.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w300/${movieDetails.posterPath}`}
              alt={movieDetails.title}
            />
            <h3>Description:</h3>
            <p>{movieDetails.overview}</p>
            <h3>Genres:</h3>
            <ul>
              {movieDetails.genres.map((genre, i) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>

            <h3>Cast:</h3>
            <ul>
              {movieDetails.cast.map((actor, i) => (
                <li key={actor.cast_id}>{actor.name}</li>
              ))}
            </ul>

            <h3>Directors:</h3>
            <ul>
              {movieDetails.crew.map((crewMember) => (
                <li key={crewMember.id}>{crewMember.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsModel;
