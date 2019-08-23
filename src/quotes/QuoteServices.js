const QuotesServices = {
  getQuotesByIdArray(dbInstance, randomNumArray) {
    return dbInstance
            .from('quotes')
            .select('*')
            .whereIn('id', randomNumArray);
  },

  insertQuote(dbInstance, quoteData) {
    return dbInstance
            .insert(quoteData)
            .into('quotes')
            .returning('*')
            .then(res => {
              return res[0];
            });
  },
  updateQuote(dbInstance, updateQuoteData) {
    return dbInstance
            .from('quotes')
            .where({id: updateQuoteData.id})
            .update({
              category: updateQuoteData.category,
              subcategory: updateQuoteData.subcategory,
              quote: updateQuoteData.quote,
              author: updateQuoteData.author,
              authorfacts: updateQuoteData.authorfacts,
              keywords: updateQuoteData.keywords,
            });
  },
  deleteQuote(dbInstance, quoteId) {
    return dbInstance('quotes')
            .where({id: quoteId})
            .del();
  }
}
module.exports = QuotesServices;