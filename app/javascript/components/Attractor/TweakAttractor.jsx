import React from 'react';
import styled from 'styled-components';

import Attractor from './';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 1em;
`;

function tweakNumbers({coefficients, n, startingCoordinates, sensitivity = .05}) {
  const results = [];
  for (let i = 0; i < n; i++) {
    results.push({
      coefficients: coefficients.map(num => num + (Math.random() * sensitivity - sensitivity/2)),
      startingCoordinates: startingCoordinates.map(num => num + (Math.random() * sensitivity - sensitivity/2)),
    });
  }
  return results;
}

const TweakAttractor = ({className, coefficients, startingCoordinates}) => {
  const tweakedResults = tweakNumbers({coefficients, n: 9, sensitivity: .02, startingCoordinates});

  return (
    <Grid className={className}>
      {tweakedResults.map(({coefficients: tweakedCoefficients, startingCoordinates: tweakedStartingCoordinates}) => (
        <div key={tweakedCoefficients.join(',')}>
          <Attractor
            coefficients={tweakedCoefficients}
            showEquation={false}
            startingCoordinates={tweakedStartingCoordinates}
            initialCount={30000}
            width={300}
            height={300}
          />
        </div>
      ))}
    </Grid>
  );
};

export default TweakAttractor;
