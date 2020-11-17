import React, { useEffect, useState } from 'react';

const Clock = ({ name }) => {
  const [timePlay, setTimePlay] = useState(null);
  const [seconds, setSeconds] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [isPlay, setIsPlay] = useState(false)

  useEffect(() => {
      let timer;
      if (isPlay) timer  = setTimeout(getConversionTime, 1000);
      return () => clearInterval(timer);
    },
    [timePlay, seconds, isPlay]
  )

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
    localStorage.setItem(name, `${minutes}:${seconds}`);
  }

  const getConversionTime = () => {
    const diff = Math.floor((new Date() - timePlay)/1000);
    let min = Math.floor(diff / 60);
    let sec = diff - minutes * 60;

    if (min < 10) min = '0' + min;
    if (sec < 10) sec = '0' + sec;
    if (sec === 60) sec = '00';

    setMinutes(min);
    setSeconds(sec);
  }

  return (
    <span>
      <button type="button" className="icon icon-play" onClick={onPlay} aria-label="Play" />
      <button type="button" className="icon icon-pause" onClick={onPause} aria-label="Pause" />
      <span className="time">{minutes}:{seconds}</span>
    </span>
  );
};

export default Clock;
