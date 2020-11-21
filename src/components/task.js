import React, { useState, useEffect } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Clock from './clock';

const Task = (props) => {
  const { task, onCompletedTask, onEditTask, onEditNameTask, onDelete } = props;
  const { name, completed, editing, id, date } = task;

  const [dateCreate, setDateCreate] = useState(formatDistanceToNow(date, { includeSeconds: true }));
  const [timePlay, setTimePlay] = useState(null);
  const [time, setTime] = useState('00:00');
  const [isPlay, setIsPlay] = useState(false)

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

  const onPlay = () => {
    if (isPlay) return;
    const value = localStorage.getItem(name);
    if (value) {
      let [min, sec] = value.split(':');
      localStorage.removeItem(name);
      setTimePlay(new Date() - (Number(min) * 60 + Number(sec)) * 1000)
    } else {
      setTimePlay(new Date());
    }
    setIsPlay(true);
  }

  const onPause = () => {
    if (!isPlay) return;
    setIsPlay(false);
    localStorage.setItem(name, `${time}`);
  }

  const getConversionTime = () => {
    const diff = Math.floor((new Date() - timePlay)/1000);
    let min = Math.floor(diff / 60);
    let sec = diff - min * 60;

    if (min < 10) min = '0' + min;
    if (sec < 10) sec = '0' + sec;
    if (sec === 60) sec = '00';

    setTime(`${min}:${sec}`);
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
          {!completed && <Clock name={name} time={time} timePlay={timePlay} onPlay={onPlay} onPause={onPause} 
            isPlay={isPlay} getConversionTime={getConversionTime} />}
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
