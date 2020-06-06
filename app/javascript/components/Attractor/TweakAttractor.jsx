import React from 'react';
import styled from 'styled-components';

import Attractor from './';

const AttractorContainer = styled.div`
  // TODO: grid item
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

const TweakAttractor = ({coefficients, startingCoordinates}) => {
  const tweakedResults = tweakNumbers({coefficients, n: 9, sensitivity: .02, startingCoordinates});

  return (
    <div>
      {tweakedResults.map(({coefficients: tweakedCoefficients, startingCoordinates: tweakedStartingCoordinates}) => (
        <AttractorContainer key={tweakedCoefficients.join(',')}>
          <Attractor
            coefficients={tweakedCoefficients}
            showEquation={false}
            startingCoordinates={tweakedStartingCoordinates}
          />
        </AttractorContainer>
      ))}
    </div>
  );
};

export default TweakAttractor;
