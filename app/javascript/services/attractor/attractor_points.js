// 50 is somewhat arbitrary. Worth playing with it to find the best value.
const IGNORE_FIRST_X_POINTS = 50;

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
    }
   */
  constructor({coefficients, initialCount = 0}) {
    this.coefficients = coefficients;
    this.points = [];
    this.boring = false; // Will stop calculating more points if boring
    this.boringReason = null;
    this.calculateMorePoints(initialCount);
  }

  calculateMorePoints(count = 1) {
    if (this.boring) {
      return;
    }
    let [x0, y0] = this._getLastPoint() || [Math.random()/2 - .25, Math.random()/2 - .25];
    for (let i = 0; i < count; i++) {
      const [x1, y1] = calculateNextPoint(x0, y0, this.coefficients);
      this._addPoint(x1, y1);
      [x0, y0] = [x1, y1];
      if (Math.max(Math.abs(x0), Math.abs(y0)) > 10) {
        this.boring = true;
        this.boringReason = 'Overflow';
        break;
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
}
