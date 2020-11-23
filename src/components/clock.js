import React, { useEffect } from 'react';

const Clock = ({ time, timePlay, isPlay, getConversionTime, onPlay, onPause }) => {
  
  useEffect(() => {
      let timer;
      if (isPlay) timer  = setTimeout(getConversionTime, 1000);
      return () => clearInterval(timer)
    },
    [timePlay, time, isPlay, getConversionTime ]
  )

  return (
    <span>
      <button type="button" className="icon icon-play" onClick={onPlay} aria-label="Play" />
      <button type="button" className="icon icon-pause" onClick={onPause} aria-label="Pause" />
      <span className="time">{time}</span>
    </span>
  );
};

Clock.defaultProps = {
  name: "",
}

export default Clock;
