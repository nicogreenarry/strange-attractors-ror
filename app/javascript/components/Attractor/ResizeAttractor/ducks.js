import ax from 'packs/axios';

/* Actions */
// Pages in rails are 1-indexed
export async function fetchFeaturedAttractors(pageNumber = 1) {
  const res = await ax.get(`/attractors/featured?page=${pageNumber}`);
  const attractors = res.data;

  return attractors.map(a => ({id: a.id, ...a.details}));
}
