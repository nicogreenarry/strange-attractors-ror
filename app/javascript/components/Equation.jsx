import * as _ from 'lodash';
import React from 'react';
import MathJax from 'react-mathjax';
import styled from 'styled-components';

/*
// TODO: Use these in whatever documentation I produce
const xEquation = `
  x_{n+1} = c_1 + c_2 x_n + c_3 x_n^2 + c_4 x_n y_n + c_5 y_n + c_6 y_n^2
`;
const yEquation = `
  y_{n+1} = c_7 + c_8 x_n + c_9 x_n^2 + c_10 x_n y_n + c_11 y_n + c_12 y_n^2
`;
*/

const polynomials = ['x_n', 'x_n^2', 'x_n y_n', 'y_n', 'y_n^2'];

const DESIRED_SIG_DIGITS = 2;
const MAX_POSSIBLE_DIGITS = 16;

function round(value, digits) {
  return Math.round(value * Math.pow(10, digits)) / Math.pow(10, digits);
}

function getMeaningfulCoefficient(coeff, digits = DESIRED_SIG_DIGITS) {
  if ([0, 1].includes(Math.abs(coeff))) {
    return coeff;
  }

  const rounded = round(coeff, digits);
  const needMoreSigDigs = [0, 1].includes(Math.abs(rounded)) && DESIRED_SIG_DIGITS < MAX_POSSIBLE_DIGITS;

  return needMoreSigDigs
    ? getMeaningfulCoefficient(coeff, digits + 1)
    : rounded;
}

function getTerms(coefficients) {
  return _(coefficients)
    .zip(polynomials)
    .filter(([coeff]) => coeff !== 0)
    .map(([coeff, polynomial]) => {
      const sign = coeff > 0 ? '+' : '-';
      return `${sign} ${Math.abs(coeff) === 1 ? '' : Math.abs(coeff)} ${polynomial}`;
    })
    .value();
}

const EquationContainer = styled.div`
  // The equation doesn't render immediately, so a hard-coded height prevents the page from jumping around.
  height: 7em; 
`;

const Equation = ({coefficients, startingCoordinates}) => {
  // Abbreviated coefficients
  const c = coefficients.map(coefficient => getMeaningfulCoefficient(coefficient));
  // It's easiest to format the leading coefficients specially, since if they're negative, we don't want their minus
  // sign to have the same spacing as other minus signs.
  const xCoefficients = c.slice(0, 6);
  const yCoefficients = c.slice(6);
  const c0 = xCoefficients.shift();
  const c6 = yCoefficients.shift();

  const xTerms = getTerms(xCoefficients);
  const yTerms = getTerms(yCoefficients);

  const xEquation = `x_{n+1} = ${c0} ${xTerms.join(' ')}`;
  const yEquation = `y_{n+1} = ${c6} ${yTerms.join(' ')}`;

  return (
    <MathJax.Provider>
      <EquationContainer>
        <MathJax.Node formula={xEquation} />
        <MathJax.Node formula={yEquation} />
      </EquationContainer>
    </MathJax.Provider>
  );
};

export default Equation;
