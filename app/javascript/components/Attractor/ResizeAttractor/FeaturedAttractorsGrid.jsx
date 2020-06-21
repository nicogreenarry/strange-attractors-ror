import React, {useEffect, useState} from 'react';
import PaginateUnstyled from 'react-paginate';
import styled from 'styled-components';
import {fetchFeaturedAttractors} from './ducks';
import Attractor from '../index';

const PAGE_RANGE_DISPLAYED = 5;
const MARGIN_PAGES_DISPLAYED = 2;

function PaginateWithClassNameWrapper({className, containerClassName, ...props}) {
  return (
    <PaginateUnstyled
      containerClassName={`${className || ''} ${containerClassName || ''}`}
      {...props}
    />
  );
}
const Paginate = styled(PaginateWithClassNameWrapper)`
  .pagination__active {
    color: white;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1em;
  margin-bottom: 8px;
`;

const DISPLAY_PER_PAGE = 12;

function FeaturedAttractorsGrid({count, handleSelectAttractor}) {
  const [attractors, setAttractors] = useState([]);
  useEffect(() => {
    fetchFeaturedAttractors(1).then(setAttractors);
  }, []);

  function handlePageChange({ selected, ...rest }) {
    // react-paginate page numbers are 0-indexed, unlike rails' pagination
    fetchFeaturedAttractors(selected + 1).then(setAttractors);
  }

  return (
    <>
      <Grid>
        {attractors.map(attractor => (
          <Attractor
            coefficients={attractor.coefficients}
            initialCount={30000}
            startXy={attractor.startXy}
            width={200}
            height={200}
            handleClickAttractor={handleSelectAttractor}
            key={attractor.id}
          />
        ))}
      </Grid>
      <Paginate
        onPageChange={handlePageChange}
        pageCount={Math.ceil(count/DISPLAY_PER_PAGE)}
        containerClassName="pagination btn-group"
        role="group"
        pageClassName="btn btn-outline-secondary"
        previousClassName="btn btn-outline-secondary stretched-link"
        nextClassName="btn btn-outline-secondary stretched-link"
        pageLinkClassName="pagination__link stretched-link"
        activeClassName="pagination__active btn-secondary"
        marginPagesDisplayed={MARGIN_PAGES_DISPLAYED}
        pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
      />
    </>
  )
}

export default FeaturedAttractorsGrid;
