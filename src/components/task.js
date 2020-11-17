import React, { useState, useEffect } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Clock from './clock';

const Task = (props) => {
  const { task, onCompletedTask, onEditTask, onEditNameTask, onDelete } = props;
  const { name, completed, editing, id, date } = task;

  const [dateCreate, setDateCreate] = useState(formatDistanceToNow(date, { includeSeconds: true }));

  useEffect(() => {
      let timer = setInterval(() => setDateCreate(formatDistanceToNow(date, { includeSeconds: true })), 2000);
      return () => clearInterval(timer);
    });

  const onChangeInp = (id, event) => {
    if (event.key === "Enter") {
      const nameTask = event.target.value;
      onEditNameTask(id, nameTask)
    }
    if (event.key === "Escape") {
      onEditNameTask(id, name)
    }
  }

  if (editing) {
    return (
      <li className="editing">
        <input type="text" className="edit" defaultValue={name} onKeyDown={(event) => onChangeInp(id, event)} />
      </li>
    );
  }

  const className = completed ? 'completed' : 'active';

  return (
    <li key={id} className={className}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={() => onCompletedTask(id)} checked={completed} />
        <label>
          <span className="title">{name}</span>
          <Clock name={name} />
          <span className="created">{dateCreate}</span>
        </label>
        {!completed && (
          <button type="button" className="icon icon-edit" onClick={() => onEditTask(id)} aria-label="Editing Task" />
        )}
        <button type="button" className="icon icon-destroy" onClick={() => onDelete(id)} aria-label="Delete Task" />
      </div>
    </li>
  );
};

export default Task;
