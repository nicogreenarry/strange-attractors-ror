import React from 'react';

import FeaturedAttractorsGrid from './FeaturedAttractorsGrid';

function ResizeAttractor({count}) {
  return (
    <div>
      <FeaturedAttractorsGrid count={count} />
    </div>
  )
}

export default ResizeAttractor;
