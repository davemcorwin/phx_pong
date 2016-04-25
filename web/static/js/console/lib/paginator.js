export default class Paginator {
  constructor(collection, pageSize=4) {
    this.collection = collection
    this.pageSize = pageSize
    this.currentPage = 0
  }

  next() {
    this.currentPage += 1
  }

  previous() {
    this.currentPage -= 1
  }

  isFirstPage() {
    return this.currentPage === 0
  }

  isLastPage() {
    return this.collection.length <= (this.currentPage + 1) * this.pageSize
  }

  page() {
    return this.collection.splice(this.currentPage * this.pageSize, this.pageSize)
  }
}
