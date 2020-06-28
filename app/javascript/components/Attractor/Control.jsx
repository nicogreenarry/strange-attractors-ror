import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  justify-content: flex-start;
`;

/*
  props: {
    className?: string;
    icon: React.ReactNode; // Will be displayed when controls are collapsed
    label: React.ReactNode; // Will be displayed (along with icon) when controls are expanded
    handleClick(): void | Promise<void>;
  }
 */
function Control({icon, label, className, onClick}) {
  return (
    <Button className={`btn btn-sm mb-1 ${className || ''}`} onClick={onClick}>
      {icon} <span className="control-label ml-1">{label}</span>
    </Button>
  )
}

export default Control;
