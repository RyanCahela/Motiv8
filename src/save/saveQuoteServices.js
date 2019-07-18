const SaveQuoteServices = {
  getSavedQuotesByUserId(dbInstance, userId) {
    console.log(userId);
    return dbInstance
            .from('savedquotes')
            .join('quotes', 'savedquotes.quoteid', '=', 'quotes.id')
            .select(
              'authorfont',
              'backgroundimageurl',
              'bodyfont',
              'quoteid',
              'savedquotes.id',
              'quote',
              'author',
              'userid')
            .where({'userid': userId });
  },
  saveQuote(dbInstance, quoteToSave) {
    return dbInstance
            .from('savedquotes')
            .insert(quoteToSave)
            .returning('*');
  },
  updateSavedQuoteById(dbInstance, savedQuoteId, updatedQuote) {
    return dbInstance
            .from('savedquotes')
            .where({'id': savedQuoteId})
            .update(updatedQuote)
            .returning('*');
  },
  deleteSavedQuoteById(dbInstance, savedQuoteId) {
    return dbInstance
            .from('savedquotes')
            .where({'id' : savedQuoteId})
            .del();
  }
}

module.exports = SaveQuoteServices;