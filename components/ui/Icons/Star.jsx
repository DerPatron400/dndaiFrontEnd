import React from "react";

export default function Star(props) {
  if (props.isfilled) {
    return (
      <svg
        data-name='Ebene 1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 20 20'
        {...props}
      >
        <path d='m13.867 11.089 1.4 5.911L10 13.867 4.733 17l1.4-5.911L1.467 7.11 7.6 6.578 10 1l2.4 5.6 6.133.511-4.666 3.978Z' />
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
