import React from "react";

export default function Dice(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      fill='#fff'
      {...props}
    >
      <path d='M3 3v14h14V3H3zm13 13H4V4h12v12zM6 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm3 3a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm3 3a1 1 0 1 1 2 0 1 1 0 0 1-2 0z' />
    </svg>
  );
}
