const QuotesServices = {
  getQuotesByIdArray(dbInstance, randomNumArray) {
    return dbInstance
            .from('quotes')
            .select('*')
            .whereIn('id', randomNumArray);
  }
}
module.exports = QuotesServices;