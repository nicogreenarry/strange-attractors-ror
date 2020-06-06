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
            <TweakAttractor {...attractorPointProps} className="mb-3" />
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
          }}
        >
          Tweak this attractor
        </button>
      </div>
    </div>
  );
};
