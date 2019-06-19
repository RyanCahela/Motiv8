const IteratorServices = {
  createIterator(iterable) {
    return this.createIteratorObj(iterable);
  },

  *createIteratorObj(arr) {
    for(let obj of arr) {
      yield obj;
    }
  }
}

export default IteratorServices;