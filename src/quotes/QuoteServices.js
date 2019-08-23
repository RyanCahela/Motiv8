const QuotesServices = {
  getQuotesByIdArray(dbInstance, randomNumArray) {
    return dbInstance
            .from('quotes')
            .select('*')
            .whereIn('id', randomNumArray);
  }

  insertQuote(dbInstance, quoteToInsert) {
    return dbInstance
            .insert(quoteToInsert)
            .into('quotes');
  }
}
module.exports = QuotesServices;