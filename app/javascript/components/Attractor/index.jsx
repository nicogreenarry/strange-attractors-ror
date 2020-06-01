import React, { useEffect, useMemo, useRef } from 'react';
import AttractorPoints from '../../services/attractor/attractor_points';
import coefficientsFromLetters from '../../services/attractor/coefficients_from_letters';

const WIDTH = 500;
const HEIGHT = 500;

const COLOR = [15, 12, 156, 255]; // RGBA color

function getColorIndicesForCoord(x, y, width) {
  var red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
}

function getCanvasXYFromPoint({x, y, xMin, xMax, yMin, yMax}) {
  const canvasX = Math.round((x - xMin) / (xMax - xMin) * (WIDTH - 1));
  const canvasY = HEIGHT - Math.round((y - yMin) / (yMax - yMin) * (HEIGHT - 1)) - 1;
  return [canvasX, canvasY];
}

/*
  props: {
    coefficients: array of 12 integers
    className?: string
  }
 */
const Attractor = (props) => {
  const canvasEl = useRef(null);
  const attractor = useMemo(() => {
    return new AttractorPoints({
      coefficients: coefficientsFromLetters(props.coefficients),
      initialCount: 45000,
    });
  }, [...props.coefficients]);

  useEffect(() => {
    if (!canvasEl.current) {
      return;
    }

    const ctx = canvasEl.current.getContext('2d');
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = 'green';

    // TODO: Pull a lot of this logic out into services
    const points = attractor.getPointsForRendering();
    const {xMin, xMax, yMin, yMax} = points.reduce((bounds, [x, y]) => {
      bounds.xMin = Math.min(bounds.xMin, x);
      bounds.xMax = Math.max(bounds.xMax, x);
      bounds.yMin = Math.min(bounds.yMin, y);
      bounds.yMax = Math.max(bounds.yMax, y);
      return bounds;
    }, {xMin: Infinity, xMax: -Infinity, yMin: Infinity, yMax: -Infinity});
    const attractorImageData = ctx.createImageData(WIDTH, HEIGHT);
    points.forEach(([x, y]) => {
      const [canvasX, canvasY] = getCanvasXYFromPoint({x, y, xMin, xMax, yMin, yMax});
      const [redIdx, greenIdx, blueIdx, alphaIdx] = getColorIndicesForCoord(canvasX, canvasY, WIDTH);
      attractorImageData.data[redIdx] = COLOR[0];
      attractorImageData.data[greenIdx] = COLOR[1];
      attractorImageData.data[blueIdx] = COLOR[2];
      attractorImageData.data[alphaIdx] = COLOR[3];
    });
    ctx.putImageData(attractorImageData, 0, 0);
  }, [canvasEl.current, props.coefficients]);

  return <canvas
    ref={canvasEl}
    id="main-attractor"
    width={WIDTH}
    height={HEIGHT}
    className={props.className}
  />
};

export default Attractor;