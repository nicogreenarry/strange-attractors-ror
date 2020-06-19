import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import Attractor from './';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 1em;
`;

function tweakNumbers({coefficients, n, startXy, sensitivity = .05}) {
  const results = [];
  for (let i = 0; i < n; i++) {
    results.push({
      coefficients: coefficients.map(num => num + (Math.random() * sensitivity - sensitivity/2)),
      startXy: startXy.map(num => num + (Math.random() * sensitivity - sensitivity/2)),
    });
  }
  return results;
}

const TweakAttractor = ({cacheId, className, coefficients, startXy}) => {
  function generateTweakedResults() {
    return tweakNumbers({coefficients, n: 9, sensitivity: .02, startXy});
  }
  const [tweakedResults, setTweakedResults] = useState(generateTweakedResults);
  useEffect(() => {
    setTweakedResults(generateTweakedResults());
  }, [cacheId, ...coefficients, ...startXy]);

  return (
    <Grid className={className}>
      {tweakedResults.map(({coefficients: tweakedCoefficients, startXy: tweakedStartXy}) => (
        <div key={tweakedCoefficients.join(',')}>
          <Attractor
            coefficients={tweakedCoefficients}
            showEquation={false}
            startXy={tweakedStartXy}
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
