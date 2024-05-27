import React from "react";

export default function Sheet(props) {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M10 10H9V9H10V10ZM13 6H12V14H13V6ZM10 11H9V14H10V11ZM17 3V17H3V3H17ZM16 4H4V16H16V4ZM7 10H6V14H7V10Z' />
    </svg>
  );
}
