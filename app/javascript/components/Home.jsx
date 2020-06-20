import axios from 'axios';
import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import findInterestingCoefficients from '../services/attractor/find_interesting_coefficients';

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

async function fetchRandomFeaturedAttractor() {
  const res = await axios.get('/attractors/featured/random');
  const attractor = res.data;
  if (!attractor) {
    return null;
  }
  attractor.details = JSON.parse(attractor.details);
  return attractor;
}

export default () => {
  const [attractorPointProps, setAttractorPointProps] = useState(null);
  useEffect(() => {
    async function fetchFeaturedAttractorEffect() {
      const attractor = await fetchRandomFeaturedAttractor();
      // TODO: Eventually it would be nice to display an error message in the UI
      if (!attractor) {
        return;
      }
      setAttractorPointProps(prev => {
        // If attractorPointProps has gotten set before this call returns, then do nothing.
        if (prev) {
          return;
        }
        return attractor.details;
      });
    }
    fetchFeaturedAttractorEffect();
  }, [])

  const [tweakMode, setTweakMode] = useState(false);
  const [cacheId, setCacheId] = useState(0); // Ultimately this will be based on something like the history length

  return (
    <PageContainer>
      <Sidebar>
        <PageControls>
          <SidebarButton
            onClick={async () => {
              const attractorBeforeFetch = attractorPointProps;
              const attractor = await fetchRandomFeaturedAttractor();
              setTweakMode(false);
              setAttractorPointProps(prev => {
                // If attractorPointProps has been changed before this call returns, then do nothing.
                if (prev !== attractorBeforeFetch) {
                  return prev;
                }
                return attractor.details;
              });
            }}
          >
            Random featured attractor
          </SidebarButton>
          <SidebarButton
            onClick={() => {
              setTweakMode(false);
              const attractorPoints = findInterestingCoefficients();
              setAttractorPointProps(attractorPoints);
            }}
          >
            Generate new attractor
          </SidebarButton>
        </PageControls>
        <AttractorControls>
          <SidebarButton
            onClick={() => {
              setTweakMode(true);
              setCacheId(prev => prev + 1);
            }}
          >
            Tweak this attractor
          </SidebarButton>
        </AttractorControls>
      </Sidebar>
      <Main>
        {attractorPointProps && tweakMode && (
          <TweakAttractor cacheId={cacheId} {...attractorPointProps} className="mb-3" />
        )}
        {attractorPointProps && !tweakMode && (
          <Attractor
            {...attractorPointProps}
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
