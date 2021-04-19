import React from "react";
import s from "../styles/searchbar.module.css"

const SearchBar = (props) => {

    function onSubmit(e) {
        props.search(e.target.value)
    }

  return (
    <div className={s.divSearchBar}>
      <form id={s.TodosForm} onChange={(e) => onSubmit(e)}>
        <label htmlFor="Todos">Filter by Completed</label>
        <select name="Todos" id="Todos" form="TodosForm">
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </form>
    </div>
  );
};

export default SearchBar;
