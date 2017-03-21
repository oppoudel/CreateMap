export default {
  groupID: '1478688468f14058863b246e1d7c6be0',
  numberOfItems: 50,
  sortField: 'numRatings', // SORTING COLUMN= The allowed field names are title, uploaded, type, owner, avgRating, numRatings, numComments and numViews. Default: 'uploaded'
  sortOrder: 'desc', // SORTING ORDER: Values: 'asc' or 'desc'. Default: 'desc'.
  getUrl () {
    return 'https://www.arcgis.com/sharing/search?q=group%3A%22' + this.groupID + '%22&f=json&num=' + this.numberOfItems + '&sortField=' + this.sortField + '&sortOrder=' + this.sortOrder
  }
}
