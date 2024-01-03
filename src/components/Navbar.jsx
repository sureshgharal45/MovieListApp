import React, { useState } from "react";

const Navbar = ({ genres, filterMoviesByGenres }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  // handle genre tabs by handleGenreClick function
  const handleGenreClick = (genreId) => {
    let index = selectedGenres.indexOf(genreId);
    let updatedGenres = [];
    if (index === -1) {
      updatedGenres = [...selectedGenres, genreId];
    } else {
      updatedGenres = selectedGenres.filter((id) => id !== genreId);
    }
    setSelectedGenres(updatedGenres);
    filterMoviesByGenres(updatedGenres);
  };

  return (
    <div className="genres">
      {genres.map((genre) => {
        return (
          <>
            <div
              key={genre.id}
              className={`genre-tab ${
                selectedGenres.includes(genre.id) ? "selected" : ""
              }`}
              onClick={() => handleGenreClick(genre.id)}
            >
              <h4 className="">{genre.name}</h4>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Navbar;
