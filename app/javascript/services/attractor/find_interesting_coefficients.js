import AttractorPoints from './attractor_points';

const COEFFICIENT_RANGE = 3;

function createAttractorPoints() {
  const coefficients = Array(12).fill().map(() => Math.random() * COEFFICIENT_RANGE - COEFFICIENT_RANGE/2);
  const startXy = Array(2).fill().map(() => Math.random() * COEFFICIENT_RANGE - COEFFICIENT_RANGE/2);
  return new AttractorPoints({
    boringnessCheckFrequency: 10, // Randomly-generated sets are much more likely to get boring very fast
    coefficients,
    startXy,
    initialCount: 2000,
  });
}

export default function findInterestingCoefficients() {
  while (true) {
    const attractorPoints = createAttractorPoints();
    if (!attractorPoints.boring) {
      return attractorPoints;
    }
  }
}
