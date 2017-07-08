// async tasks or logic here
export const populateSites = (sites) => {
  console.log('in populatesites action creator', sites)
  return {
  type: 'POPULATE_SITES',
  sites
}};

export const deleteSite = (site) => {
  console.log('in action creator', site)
  return {
  type: 'DELETE_SITE',
  // Pass back a new list of sites without deleted item
  site
}};


