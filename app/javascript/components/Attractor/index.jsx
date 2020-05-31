import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  const canvasX = Math.round((x - xMin) / (xMax - xMin) * WIDTH);
  const canvasY = HEIGHT - Math.round((y - yMin) / (yMax - yMin) * HEIGHT);
  return [canvasX, canvasY];
}

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

const Attractor = (props) => {
  const canvasEl = useRef(null);
  const attractor = useMemo(() => {
    const goodAttractorIndex = Math.floor(Math.random() * someGoodAttractors.length);
    return new AttractorPoints({
      coefficients: coefficientsFromLetters(someGoodAttractors[goodAttractorIndex]),
      initialCount: 45000,
    });
  }, [props.coefficients]);

  useEffect(() => {
    if (canvasEl.current) {
      const ctx = canvasEl.current.getContext('2d');
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
    }
  }, [canvasEl.current]);

  return <canvas ref={canvasEl} id="main-attractor" width={WIDTH} height={HEIGHT} />
};

export default Attractor;