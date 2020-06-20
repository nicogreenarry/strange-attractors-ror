import React, { useEffect, useReducer } from "react";
import styled from 'styled-components';

import findInterestingCoefficients from '../services/attractor/find_interesting_coefficients';

import Attractor from './Attractor';
import TweakAttractor from './Attractor/TweakAttractor';
import { ACTION_TYPES, KINDS, fetchRandomFeaturedAttractor, initialHistoryState, historyReducer } from './homeDucks';

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
const SidebarButtonsBase = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px;
  
  border-bottom: solid 1px lightgray;
  &:last-child {
    border-bottom: none;
  }
`;
const SidebarButtonBase = styled.button` margin: 8px; `;
const SidebarButton = ({className, children, ...props}) => (
  <SidebarButtonBase className={`btn btn-secondary ${className || ''}`} {...props}>
    {children}
  </SidebarButtonBase>
);
const PageControls = SidebarButtonsBase;
const AttractorControls = SidebarButtonsBase;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-content: center;
  
  padding: 8px;
  
  flex-grow: 1;
`;

export default () => {
  async function fetchFeaturedAttractorEffect() {
    const attractorRequest = fetchRandomFeaturedAttractor();
    historyDispatch({type: ACTION_TYPES.requestingAttractor, request: attractorRequest});
    const attractor = await attractorRequest;
    historyDispatch({
      type: ACTION_TYPES.forward,
      next: {kind: KINDS.attractor, attractor},
      request: attractorRequest,
    });
  }
  useEffect(() => {
    fetchFeaturedAttractorEffect();
  }, []);

  const [historyState, historyDispatch] = useReducer(historyReducer, initialHistoryState);

  const tweakMode = (historyState.current || {}).kind === KINDS.tweakedAttractor;

  return (
    <PageContainer>
      <Sidebar>
        <PageControls>
          <SidebarButton onClick={fetchFeaturedAttractorEffect} disabled={historyState.request}>
            Random featured attractor
          </SidebarButton>
          <SidebarButton
            onClick={() => {
              const attractorPoints = findInterestingCoefficients();
              historyDispatch({
                type: ACTION_TYPES.forward,
                // An AttractorPoints instance can be used as a HistoricalAttractor, since coefficients and startXy are accessible.
                next: {kind: KINDS.attractor, attractor: attractorPoints},
              });
            }}
          >
            Generate new attractor
          </SidebarButton>
        </PageControls>
        <AttractorControls>
          <SidebarButton
            onClick={() => {
              historyDispatch({
                type: ACTION_TYPES.forward,
                next: {kind: KINDS.tweakedAttractor},
              });
            }}
          >
            Tweak this attractor
          </SidebarButton>
        </AttractorControls>
      </Sidebar>
      <Main>
        {historyState.current && tweakMode && (
          <TweakAttractor cacheId={historyState.history.length} {...historyState.current.attractor} className="mb-3" />
        )}
        {historyState.current && !tweakMode && (
          <Attractor
            {...historyState.current.attractor}
            showEquation={true}
            className="mb-3"
            initialCount={45000}
            width={500}
            height={500}
          />
        )}
      </Main>
    </PageContainer>
  );
};
