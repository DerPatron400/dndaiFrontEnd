import React from "react";

export default function Star(props) {
  if (props.isfilled) {
    return (
      <svg
        width='18'
        height='16'
        viewBox='0 0 18 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        <path d='M12.8668 10.0889L14.2668 16L9.0001 12.8666L3.7334 16L5.1334 10.0889L0.466797 6.1111L6.6001 5.5778L9.0001 0L11.4001 5.6L17.5334 6.1111L12.8668 10.0889Z' />
      </svg>
    );
  }
  return (
    <svg
      data-name='Ebene 1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      {...props}
    >
      <path d='M18.533 7.111 12.4 6.6 10 1 7.6 6.578l-6.133.533 4.666 3.978L4.733 17 10 13.867 15.267 17l-1.4-5.911 4.666-3.978ZM10 12.703l-3.75 2.23.997-4.208L3.934 7.9l4.348-.378 1.716-3.988 1.72 4.013 4.339.361-3.304 2.816.996 4.21-3.75-2.23Z' />
    </svg>
  );
}
