import React, {useEffect} from 'react';
import PaginateUnstyled from 'react-paginate';
import styled from 'styled-components';
import {fetchFeaturedAttractors} from './ducks';
import Attractor from '../index';

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
`;

const DISPLAY_PER_PAGE = 12;

function FeaturedAttractorsGrid({count}) {
  const [attractors, setAttractors] = React.useState([]);
  useEffect(() => {
    fetchFeaturedAttractors(0).then(setAttractors);
  }, []);

  function handlePageChange({ selected, ...rest }) {
    console.log(`[FeaturedAttractorsGrid.jsx L17] rest:`, rest);
    fetchFeaturedAttractors(selected).then(setAttractors);
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
          />
        ))}
      </Grid>
      <Paginate
        onPageChange={handlePageChange}
        pageCount={Math.ceil(count/DISPLAY_PER_PAGE)}
        containerClassName="pagination btn-group"
        role="group"
        pageClassName="btn btn-outline-secondary"
        previousClassName="btn btn-outline-secondary"
        nextClassName="btn btn-outline-secondary"
        pageLinkClassName="pagination__link"
        activeClassName="pagination__active btn-secondary"
      />
    </>
  )
}

export default FeaturedAttractorsGrid;
