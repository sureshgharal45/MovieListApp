import React from "react";

const Header = ({ handleSearch }) => {
  const customDValue =
    "M-65,80c5-6.1,40.5-46.8,143.6-45.6c96.3,1.2,95.8,40.3,25.1,48";

  const onSearch = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <div className="header">
      <svg width={370} height={130}>
        <defs>
          <path id="ellipse-id-r0" d={customDValue} />
        </defs>
        <path d={customDValue} fill="none" />
        <text fontSize="23" letterSpacing="1.5" fontWeight="700">
          <textPath xlinkHref="#ellipse-id-r0" startOffset="95" fill="#e92c2c">
            <tspan style={{ cursor: "pointer" }}>MOVIEFIX</tspan>
          </textPath>
        </text>
      </svg>
      <form className="search-bar">
        <input
          type="text"
          className="search-input"
          name="searchInput"
          placeholder="Search movies..."
          onChange={onSearch}
        />
      </form>
    </div>
  );
};

export default Header;
