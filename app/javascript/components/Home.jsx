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
      <section className="d-flex w-100">
        <div className="sidebar d-flex flex-column justify-content-start flex-grow-0 p-2">
          <div className="d-flex flex-column justify-content-center border-bottom py-2">
            <button
              className="btn btn-secondary m-2"
              onClick={() => {
                setTweakMode(false);
                setCoefficientsIdx(prevIdx => (prevIdx + 1) % someGoodAttractors.length);
              }}
            >
              Next featured attractor
            </button>
            <button
              className="btn btn-secondary m-2"
              onClick={() => {
                setTweakMode(false);
                const attractorPoints = findInterestingCoefficients();
                setAttractorPointProps(attractorPoints);
              }}
            >
              Generate new attractor
            </button>
          </div>{/* /page controls */}
          <div className="d-flex flex-column justify-content-center mb-4 py-2">
            <button
              className="btn btn-secondary m-2"
              onClick={() => {
                setTweakMode(true);
                setCacheId(prev => prev + 1);
              }}
            >
              Tweak this attractor
            </button>
          </div>{/* /attractor controls */}
        </div>{/* /sidebar */}
        <main className="flex-grow-1 d-flex flex-column justify-content-start align-content-center p-2">
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
        </main>
      </section>
    </div>// /page container
  );
};
