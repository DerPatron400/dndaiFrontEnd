import React from "react";

export default function Like(props) {
  if (props.isfilled) {
    return (
      <svg
        id='Ebene_1'
        data-name='Ebene 1'
        xmlns='http://www.w3.org/2000/svg'
        version='1.1'
        viewBox='0 0 20 20'
        {...props}
      >
        <defs></defs>
        <path
          class='cls-1'
          d='M6,16H2v-8h4v8ZM17.6,7.6h0c-.2-.2-.6-.4-.9-.4h-4.2l.7-3.5h0c0-.3,0-.6,0-.8-.1-.2-.3-.4-.5-.6l-.6-.4-5,5v9h8.4l2.6-6.1v-1.3c0-.4-.1-.7-.4-.9Z'
        />
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
      <path d='M17.617 7.633a1.266 1.266 0 0 0-.93-.383h-4.25l.693-3.5.018-.091a1.08 1.08 0 0 0-.09-.702 1.444 1.444 0 0 0-.475-.556L12 2 6 8H2v8h13.38L18 9.856V8.562c0-.364-.128-.674-.383-.93ZM6 15H3V9h3v6Zm11-5.349L14.719 15H7V8.414l5.105-5.105c.02.026.038.054.053.085.015.032.015.044.01.07l-.019.092-.929 4.694h5.468c.099 0 .155.023.222.09s.09.123.09.223V9.65Z' />
    </svg>
  );
}
