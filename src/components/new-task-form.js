import React, { useState } from 'react';

const NewTaskForm = ({ addTask }) => {
  const [value, setValue ] = useState('');

  const addNameTask = (event) => {
    if (event.key === 'Enter') {
      const name = event.target.value;
      addTask(name);
      setValue('');
    }
  };

  const changeForm = (event) => {
    setValue(event.target.value)
  }

  return (
    <header>
      <h1>todos</h1>
      <input className="new-todo" placeholder="What needs to be done?" onKeyDown={(event) => addNameTask(event)}
        onChange={changeForm} value={value} />
    </header>
  );
};

export default NewTaskForm;
