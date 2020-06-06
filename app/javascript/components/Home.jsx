import React, { useEffect, useState } from "react";
import Attractor from './Attractor';
import findInterestingCoefficients from '../services/attractor/find_interesting_coefficients';
import {someGoodAttractors} from '../services/attractor/saved_sets';

import TweakAttractor from './Attractor/TweakAttractor';

export default () => {
  const [coefficientsIdx, setCoefficientsIdx] = useState(0);
  const [attractorPointProps, setAttractorPointProps] = useState(someGoodAttractors[coefficientsIdx]);
  useEffect(() => {
    setAttractorPointProps(someGoodAttractors[coefficientsIdx]);
  }, [coefficientsIdx]);

  const [tweakMode, setTweakMode] = useState(false);
  const [cacheId, setCacheId] = useState(0); // Ultimately this will be based on something like the history length

  return (
    <div className="primary-color d-flex flex-column align-items-center justify-content-center">
      <div className="container secondary-color text-center">
        <h1 className="display-4">Strange Attractors</h1>
        <p className="lead">
          Math is beautiful!
        </p>
      </div>
      {
        tweakMode
          ? (
            <TweakAttractor cacheId={cacheId} {...attractorPointProps} className="mb-3" />
          ) : (
            <Attractor
              {...attractorPointProps}
              showEquation={true}
              className="mb-3"
              initialCount={45000}
              width={500}
              height={500}
            />
          )
      }

      <div className="flex mb-4">
        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            setTweakMode(false);
            setCoefficientsIdx(prevIdx => (prevIdx + 1) % someGoodAttractors.length);
          }}
        >
          Next saved attractor
        </button>
        <button
          className="btn btn-outline-primary mx-2"
          onClick={() => {
            setTweakMode(false);
            const attractorPoints = findInterestingCoefficients();
            setAttractorPointProps(attractorPoints);
          }}
        >
          Generate new attractor
        </button>
        <button
          className="btn btn-outline-primary mx-2"
          onClick={() => {
            setTweakMode(true);
            setCacheId(prev => prev + 1);
          }}
        >
          Tweak this attractor
        </button>
      </div>
    </div>
  );
};
