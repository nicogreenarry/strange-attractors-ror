import ax from 'packs/axios';

/* Actions */
export async function deleteSavedAttractor(id) {
  const res = await ax.delete(`/attractor/${id}`);
  if (res.data.success) {
    location.reload();
  }
}
