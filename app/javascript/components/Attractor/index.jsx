import React, { useEffect, useMemo, useRef } from 'react';
import AttractorPoints from '../../services/attractor/attractor_points';
import Equation from '../Equation';

const COLOR = [15, 12, 156, 255]; // RGBA color

function getColorIndicesForCoord(x, y, width) {
  const red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
}

function getCanvasXYFromPoint({x, y, xMin, xMax, yMin, yMax, width, height}) {
  const canvasX = Math.round((x - xMin) / (xMax - xMin) * (width - 1));
  const canvasY = height - Math.round((y - yMin) / (yMax - yMin) * (height - 1)) - 1;
  return [canvasX, canvasY];
}

/*
  props: {
    className?: string
    coefficients: array of 12 integers
    initialCount: integer; the number of points that will be rendered
    showEquation?: boolean
    startXy: [number, number] - the x, y coordinates of the point to start with
    width: integer
    height: integer
  }
 */
const Attractor = ({className, coefficients, initialCount, showEquation, startXy, width, height}) => {
  const canvasEl = useRef(null);
  const attractorPoints = useMemo(() => {
    return new AttractorPoints({
      coefficients: coefficients,
      initialCount,
      startXy,
    });
  }, [...coefficients]);

  useEffect(() => {
    if (!canvasEl.current) {
      return;
    }

    const ctx = canvasEl.current.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'green';

    // TODO: Pull a lot of this logic out into services
    const points = attractorPoints.getPointsForRendering();
    const {xMin, xMax, yMin, yMax} = points.reduce((bounds, [x, y]) => {
      bounds.xMin = Math.min(bounds.xMin, x);
      bounds.xMax = Math.max(bounds.xMax, x);
      bounds.yMin = Math.min(bounds.yMin, y);
      bounds.yMax = Math.max(bounds.yMax, y);
      return bounds;
    }, {xMin: Infinity, xMax: -Infinity, yMin: Infinity, yMax: -Infinity});
    const attractorImageData = ctx.createImageData(width, height);
    points.forEach(([x, y]) => {
      const [canvasX, canvasY] = getCanvasXYFromPoint({x, y, xMin, xMax, yMin, yMax, width, height});
      const [redIdx, greenIdx, blueIdx, alphaIdx] = getColorIndicesForCoord(canvasX, canvasY, width);
      attractorImageData.data[redIdx] = COLOR[0];
      attractorImageData.data[greenIdx] = COLOR[1];
      attractorImageData.data[blueIdx] = COLOR[2];
      attractorImageData.data[alphaIdx] = COLOR[3];
    });
    ctx.putImageData(attractorImageData, 0, 0);
  }, [canvasEl.current, coefficients]);

  return (
    <>
      <div className="d-flex justify-content-center">
        <canvas
          ref={canvasEl}
          width={width}
          height={height}
          className={className}
        />
      </div>
      {showEquation && (
        <Equation
          coefficients={coefficients}
          startXy={startXy}
          className="mb-3"
        />
      )}
    </>
  );
};

export default Attractor;