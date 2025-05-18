import "../SearchForm/SearchForm.css";
import { useState } from "react";

function SearchForm({ handleSearchSubmit }) {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      formError("Keywords needed");
      return;
    }
    console.log("Form submitted", value);
    handleSearchSubmit(value);
  };
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <div className="search">
      <form action="" className="search__form" onSubmit={handleSubmit}>
        <div className="search__container">
          <input
            type="text"
            className="search__input"
            onChange={handleChange}
            placeholder="Enter topic"
            maxLength={30}
            required
            value={value || ""}
          />
          <button type="submit" className="search__submit-btn">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
