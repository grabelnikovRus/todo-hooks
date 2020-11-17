import React from 'react';


import TasksFilter from './tasks-filter';

const Footer = ({ count, onClearCompleted, onFilter, filter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TasksFilter onFilter={onFilter} filter={filter} />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};


export default Footer;
