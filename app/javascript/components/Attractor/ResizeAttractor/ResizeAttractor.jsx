import React, {useState} from 'react';

import FeaturedAttractorsGrid from './FeaturedAttractorsGrid';
import ResizableAttractorRow from './ResizableAttractorRow';

function ResizeAttractor({count}) {
  const [attractor, setAttractor] = useState(null);
  return (
    <div>
      <FeaturedAttractorsGrid count={count} handleSelectAttractor={setAttractor} />
      <ResizableAttractorRow attractor={attractor} initialWidth={100} initialHeight={40} initialCount={10000} />
      <ResizableAttractorRow attractor={attractor} initialWidth={16} initialHeight={16} initialCount={1500} />
    </div>
  )
}

export default ResizeAttractor;
