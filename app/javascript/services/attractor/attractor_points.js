import {round} from '../math';

// 50 is somewhat arbitrary. Worth playing with it to find the best value.
const IGNORE_FIRST_X_POINTS = 50;
export const BORINGNESS_CHECK_FREQUENCY = 500;

function calculateNextPoint(x0, y0, c) {
  const x1 = c[0] + c[1] * x0 + c[2] * x0**2 + c[3] * x0 * y0 + c[4] * y0 + c[5] * y0**2;
  const y1 = c[6] + c[7] * x0 + c[8] * x0**2 + c[9] * x0 * y0 + c[10] * y0 + c[11] * y0**2;

  return [x1, y1];
}

export default class AttractorPoints {
  /*
    props: {
      coefficients: array of 12 numbers
      initialCount?: integer. How many points to initially calculate.
      startXy: [number, number] - the x, y coordinates of the point to start with
   }
   */
  constructor({
    boringnessCheckFrequency = BORINGNESS_CHECK_FREQUENCY,
    coefficients,
    initialCount = 0,
    startXy,
  }) {
    this.boringnessCheckFrequency = boringnessCheckFrequency;
    this.coefficients = coefficients;
    this.points = [];
    this.startXy = startXy;
    this.boring = false; // Will stop calculating more points if boring
    this.boringReason = null;
    this.calculateMorePoints(initialCount);
  }

  calculateMorePoints(count = 1) {
    if (this.boring) {
      return;
    }
    let [x0, y0] = this.getCount() ? this._getLastPoint() : this.startXy;
    for (let i = 0; i < count; i++) {
      const [x1, y1] = calculateNextPoint(x0, y0, this.coefficients);
      this._addPoint(x1, y1);
      [x0, y0] = [x1, y1];

      // Every so often, check for boringness
      if (this.getCount() % this.boringnessCheckFrequency === 0) {
        const boringness = this._isBoring();
        if (boringness) {
          this.boring = true;
          this.boringReason = boringness.reason;
          break;
        }
      }
    }
  }

  getCount() {
    return this.points.length;
  }

  getPointsForRendering() {
    // Ignore the first few points, since it takes a few points to settle into the pattern
    return this.points.slice(IGNORE_FIRST_X_POINTS);
  }

  // Private methods
  _addPoint(x, y) {
    this.points.push([x, y]);
  }

  _getLastPoint() {
    return this.points[this.getCount() - 1];
  }

  _isBoring() {
    // Check for overflow
    const [x, y] = this._getLastPoint();
    if (Math.max(Math.abs(x), Math.abs(y)) > 10 || Number.isNaN(x) || Number.isNaN(y)) {
      return { reason: 'Overflow' };
    }

    // Check for periodicity
    // TODO investigate...apparently this is flagging the first saved attractor? And in fact a bunch of other attractors
    const recentPoints = this.points.slice(-25).map(([x, y]) => [round(x, 3), round(y, 3)]);
    const [lastX, lastY] = recentPoints.pop();
    const matchingPoint = recentPoints.find(([x0, y0]) => x0 === lastX && y0 === lastY);
    if (matchingPoint) {
      return { reason: 'Periodicity' };
    }

    return null;
  }
}
