import React, { useEffect, useState } from "react";
import Attractor from './Attractor';
import coefficientsFromLetters from '../services/attractor/coefficients_from_letters';
import findInterestingCoefficients from '../services/attractor/find_interesting_coefficients';

import Equation from './Equation';

const someGoodAttractors = [
  'amtmnqqxuyga',
  'cvqkghqtphte',
  'fircderrpvld',
  'giietpiqrrul',
  'glxoesfttpsv',
  'gxqsnskeectx',
  'hguhdphnsgoh',
  'ilibvpkjwgrr',
  'lufbbfisgjys',
  'mcrbipophtbn',
  'mdvaidoyhyea',
  'odgqcnxodnya',
  'qffvslmjjgcr',
  'uwacxdqigkhf',
  'vbwnbdelyhul',
  'wncslflgihgl',
].map(letters => ({
  coefficients: coefficientsFromLetters(letters),
  startingCoordinates: [0, 0],
}));

export default () => {
  const [coefficientsIdx, setCoefficientsIdx] = useState(0);
  const [attractorPointProps, setAttractorPointProps] = useState(someGoodAttractors[coefficientsIdx]);
  useEffect(() => {
    setAttractorPointProps(someGoodAttractors[coefficientsIdx]);
  }, [coefficientsIdx]);

  return (
    <div className="vw-100 vh-100 primary-color d-flex flex-column align-items-center justify-content-center">
      <div className="container secondary-color text-center">
        <h1 className="display-4">Strange Attractors</h1>
        <p className="lead">
          Math is beautiful!
        </p>
      </div>
      <Attractor
        {...attractorPointProps}
        className="mb-3"
      />
      <Equation {...attractorPointProps} />

      <div className="flex">
        <button
          className="btn btn-primary mx-2"
          onClick={() => setCoefficientsIdx(prevIdx => (prevIdx + 1) % someGoodAttractors.length)}
        >
          Next saved attractor
        </button>
        <button
          className="btn btn-outline-primary mx-2"
          onClick={() => {
            const attractorPoints = findInterestingCoefficients();
            setAttractorPointProps(attractorPoints);
          }}
        >
          Generate new attractor
        </button>
      </div>
    </div>
  );
};
