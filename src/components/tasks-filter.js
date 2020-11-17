import React from 'react';

const TasksFilter = ({ onFilter, filter }) => {
  const onClickFilter = (event) => {
    const value = event.target.textContent;
    onFilter(value);
  }

  const className = "selected";

  return (
    <ul className="filters">
      <li>
        <button type="button" onClick={onClickFilter} className={filter === "All" ? className : null}>
          All
        </button>
      </li>
      <li>
        <button type="button" onClick={onClickFilter} className={filter === "Active" ? className : null}>
          Active
        </button>
      </li>
      <li>
        <button type="button" onClick={onClickFilter} className={filter === "Completed" ? className : null}>
          Completed
        </button>
      </li>
    </ul>
  );
};


export default TasksFilter;
