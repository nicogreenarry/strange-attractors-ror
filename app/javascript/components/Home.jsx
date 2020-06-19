import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import findInterestingCoefficients from '../services/attractor/find_interesting_coefficients';
import {someGoodAttractors} from '../services/attractor/saved_sets';

import Attractor from './Attractor';
import TweakAttractor from './Attractor/TweakAttractor';

const PageContainer = styled.section`
  display: flex;
  width: 100%;
`;
const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  
  flex-grow: 0;
  
  padding: 2px;
`;
const SidebarButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px;
  
  border-bottom: solid 1px lightgray;
  &:last-child {
    border-bottom: none;
  }
`;
const PageControls = SidebarButtons;
const AttractorControls = SidebarButtons;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-content: center;
  
  padding: 8px;
  
  flex-grow: 1;
`;

export default () => {
  const [coefficientsIdx, setCoefficientsIdx] = useState(0);
  const [attractorPointProps, setAttractorPointProps] = useState(someGoodAttractors[coefficientsIdx]);
  useEffect(() => {
    setAttractorPointProps(someGoodAttractors[coefficientsIdx]);
  }, [coefficientsIdx]);

  const [tweakMode, setTweakMode] = useState(false);
  const [cacheId, setCacheId] = useState(0); // Ultimately this will be based on something like the history length

  return (
    <PageContainer>
      <Sidebar>
        <PageControls>
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
        </PageControls>
        <AttractorControls>
          <button
            className="btn btn-secondary m-2"
            onClick={() => {
              setTweakMode(true);
              setCacheId(prev => prev + 1);
            }}
          >
            Tweak this attractor
          </button>
        </AttractorControls>
      </Sidebar>
      <Main>
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
      </Main>
    </PageContainer>
  );
};
