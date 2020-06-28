import React from 'react';

function CloseButton({handleClick}) {
  return (
    <button type="button" className="close" aria-label="Close" onClick={handleClick}>
      <span aria-hidden="true">&times;</span>
    </button>
  );
}

export function CloseIcon() {
  return <span aria-hidden="true">&times;</span>;
}

export default CloseButton;
