import React, { useState } from "react";
import Attractor from './Attractor';
import coefficientsFromLetters from '../services/attractor/coefficients_from_letters';

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
];

export default () => {
  const [coefficientsIdx, setCoefficientsIdx] = React.useState(0);

  return (
    <div className="vw-100 vh-100 primary-color d-flex flex-column align-items-center justify-content-center">
      <div className="container secondary-color text-center">
        <h1 className="display-4">Strange Attractors</h1>
        <p className="lead">
          Math is beautiful!
        </p>
      </div>
      <Attractor coefficients={someGoodAttractors[coefficientsIdx]} className="mb-3"/>
      <button
        className="btn btn-primary"
        onClick={() => setCoefficientsIdx(prevIdx => (prevIdx + 1) % someGoodAttractors.length)}
      >
        Next
      </button>
    </div>
  );
};
