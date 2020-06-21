import React, {useState} from 'react';
import styled from 'styled-components';

import Attractor from '../index';

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  
  label {
    font-weight: bold;
    margin-right: 5px;
  }
  
  input {
    margin: 0 10px 0 0;
    width: 120px !important;
    
    &:last-child {
      margin-right: 0;
    }
  }
`;

function ResizableAttractorRow({attractor, initialWidth=300, initialHeight=300, initialCount=15000}) {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [count, setCount] = useState(initialCount);

  if (!attractor) {
    return null;
  }

  return (
    <div className="mb-4">
      <Form className="form-inline">
        <label htmlFor="width">Width</label>
        <input
          type="number"
          className="form-control"
          id="width"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        />

        <label htmlFor="height">Height</label>
        <input
          type="number"
          className="form-control"
          id="height"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />

        <label htmlFor="count">Count</label>
        <input
          type="number"
          className="form-control"
          id="count"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
      </Form>

      <Attractor {...attractor} height={height} width={width} initialCount={count} />
    </div>
  );
}

export default ResizableAttractorRow;
