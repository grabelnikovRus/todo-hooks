import React from 'react';

import Task from './task';

const TaskList = ({ tasks, onCompletedTask, onEditTask, onEditNameTask, onDelete, filter }) => {
  let array;

  if (filter === 'All') array = tasks;
  if (filter === 'Active') array = tasks.filter(task => !task.completed);
  if (filter === 'Completed') array = tasks.filter(task => task.completed);

  const elements = array.map(task => {
    return <Task key={task.id} task={task} onCompletedTask={onCompletedTask} onEditTask={onEditTask} 
      onEditNameTask={onEditNameTask} onDelete={onDelete} />
  })

  return <ul className="todo-list">{elements}</ul>;
};



export default TaskList;
