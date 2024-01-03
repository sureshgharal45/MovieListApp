import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../styles/moviecard.css";
import { throttle } from "lodash";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";
import Header from "./Header";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [loadingNextYear, setLoadingNextYear] = useState(false);
  const [loadingPreviousYear, setLoadingPreviousYear] = useState(false);
  const [currentYear, setCurrentYear] = useState(2012);
  const [previousYear, setPreviousYear] = useState(2012);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const movieListRef = useRef(null);
  const [fetchedMovies, setFetchedMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  //Logic for movies listing by up and down scroll
  const handleScroll = async () => {
    try {
      const element = movieListRef.current;
      if (element) {
        const { scrollTop, clientHeight } = element;
        const atBottom = scrollTop + clientHeight === element.scrollHeight;
        if (
          window.scrollY === 0 &&
          !loadingPreviousYear &&
          previousYear > 1900
        ) {
          setTimeout(() => {
            setLoadingNextYear(false);
            setLoadingPreviousYear(true);
          }, 300);
        } else if (
          atBottom &&
          !loadingNextYear &&
          currentYear < new Date().getFullYear()
        ) {
          setTimeout(() => {
            setLoadingNextYear(true);
            setLoadingPreviousYear(false);
          }, 300);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //fetch movies based on search
  const searchMovies = async (searchValue) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: "2dca580c2a14b55200e784d157207b4d",
            query: searchValue,
            page: 1,
            "vote_count.gte": 100,
          },
        }
      );

      if (response.data.results) {
        setFetchedMovies(response.data.results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    searchMovies(searchTerm);
  };

  //fetch genres api to get multiple types of Genres
  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list`,
        {
          params: {
            api_key: "2dca580c2a14b55200e784d157207b4d",
          },
        }
      );
      setGenres(response.data.genres);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  //fetch movies api according to year (By Default fetched 2012 movie list)
  const fetchMovies = async (year) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie`,
        {
          params: {
            api_key: "2dca580c2a14b55200e784d157207b4d",
            sort_by: "popularity.desc",
            primary_release_year: year,
            page: 1,
            "vote_count.gte": 100,
          },
        }
      );

      //sort the movie list by popularity in descending order
      const sortedMovies = response.data.results.sort(
        (a, b) => b.popularity - a.popularity
      );

      if (loadingNextYear) {
        setMovies([...movies, { year, movies: sortedMovies }]);
        setTimeout(() => {
          setLoadingNextYear(false);
          setCurrentYear(year);
        }, 300);
      } else if (loadingPreviousYear) {
        setMovies([{ year, movies: sortedMovies }, ...movies]);
        setTimeout(() => {
          setLoadingPreviousYear(false);
          setPreviousYear(year);
        }, 300);
      } else if (movies.length === 0) {
        setMovies([{ year, movies: response.data.results }]);
        setTimeout(() => {
          setCurrentYear(year);
        }, 300);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filterMoviesByGenres = (selectedGenres) => {
    setSelectedGenres(selectedGenres);
  };

  //filter movie basis on Generes logic for all movies
  const filterMovies = movies
    .map((movie) => {
      if (selectedGenres.length === 0) {
        return movie;
      }

      const filteredMovies = movie.movies.filter((movieItem) =>
        movieItem.genre_ids.some((genreId) => selectedGenres.includes(genreId))
      );

      return { ...movie, movies: filteredMovies };
    })
    .filter((movie) => movie.movies.length > 0);

  //filter movie basis on Generes logic for searched movies
  const filteredMoviesBySearch = fetchedMovies.filter((movieItem) => {
    if (selectedGenres.length === 0 || !fetchedMovies) {
      return fetchedMovies;
    }
    return movieItem.genre_ids.some((genreId) =>
      selectedGenres.includes(genreId)
    );
  });

  useEffect(() => {
    fetchMovies(currentYear);
  }, []);

  useEffect(() => {
    if (loadingNextYear && currentYear < new Date().getFullYear()) {
      fetchMovies(currentYear + 1);
    }
    if (loadingPreviousYear && previousYear > 1900) {
      fetchMovies(previousYear - 1);
    }
  }, [loadingNextYear, loadingPreviousYear]);

  useEffect(() => {
    window.addEventListener("scroll", throttle(handleScroll, 500));
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header handleSearch={handleSearch} />
      <Navbar
        genres={genres}
        selectedGenres={selectedGenres}
        filterMoviesByGenres={filterMoviesByGenres}
      />
      <div
        className="movie-container"
        onWheel={handleScroll}
        ref={movieListRef}
      >
        <MovieCard
          movies={filterMovies}
          fetchSearchMovies={filteredMoviesBySearch}
        />
      </div>
    </>
  );
};

export default Movie;
