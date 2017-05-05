import React from 'react';

const max = 5;

export default ({ value }) => {
  let dots = [];
  for (let i = 0; i < value; i++) {
    dots.push(<span key={i} className="dot filled"></span>)
  }
  for (let i = value; i < max; i++) {
    dots.push(<span key={i} className="dot unfilled"></span>)
  }

  return (
    <div className="level">
      <span className="legend">Novice</span>
      {dots}
      <span className="legend">Guru</span>
    </div>
  )
}
