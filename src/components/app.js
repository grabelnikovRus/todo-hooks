import React, { useState } from 'react';
import { v1 } from 'uuid'

import NewTaskForm from './new-task-form';
import TaskList from './task-list';
import Footer from './footer';

const App = () => {
  const [data, setData] = useState([
    { name: 'Learn React', completed: false, editing: false, id: v1(), date: new Date() },
  ]);
  const [filter, setFilter] = useState('All');

  const createTask = (nameTask) => {
    return {
      name: nameTask,
      completed: false,
      editing: false,
      id: v1(),
      date: new Date(),
    };
  };

  const addTask = (nameTask) => {
    const newTask = createTask(nameTask);
    setData((data) => {
      return [...data, newTask];
    });
  };

  const onCompletedTask = (id) => {
    const changeTask = data.map((el) => (id === el.id ? { ...el, completed: !el.completed } : el));
    setData(changeTask);
  };

  const onEditTask = (id) => {
    const changeTask = data.map((el) => (id === el.id ? { ...el, editing: true } : el));
    setData(changeTask);
  }

  const onEditNameTask = (id, nameTask) => {
      const changeTask = data.map((el) => (id === el.id ? { ...el, name: nameTask, editing: false } : el));
      setData(changeTask);
  }

  const onDelete = (id) => {
    const changeTask = data.filter((el) => id !== el.id);
    setData(changeTask);
  }

  const onClearCompleted = () => {
    const changeTask = data.filter((el) => !el.completed);
    setData(changeTask);
  }

  const onFilter = (value) => {
    setFilter(value)
  }

  const count = data.reduce((acc, task) => !task.completed ? acc += 1 : acc, 0);

  return (
    <section className="todoapp">
      <NewTaskForm addTask={addTask} />
      <section className="main">
        <TaskList tasks={data} onCompletedTask={onCompletedTask} onEditTask={onEditTask}
          onEditNameTask={onEditNameTask} onDelete={onDelete} filter={filter} />
        <Footer count={count} onClearCompleted={onClearCompleted} onFilter={onFilter} filter={filter} />
      </section>
    </section>
  );
};

export default App;
