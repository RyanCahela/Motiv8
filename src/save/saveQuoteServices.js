const SaveQuoteServices = {
  getSavedQuotesByUserId(dbInstance, userId) {
    return dbInstance
            .from('saved_quotes')
            .join('quotes', 'saved_quotes.quote_id', '=', 'quotes.id')
            .select(
              'authorfont',
              'background_image_url',
              'bodyfont',
              'quote_id',
              'saved_quotes.id',
              'quote',
              'author',
              'user_id')
            .where({'user_id': userId });
  },
  saveQuote(dbInstance, quoteToSave) {
    return dbInstance
            .from('saved_quotes')
            .insert(quoteToSave)
            .returning('*')
            .then(returningArr => returningArr[0])
            .catch(err => {throw new Error(err)});
  },
  updateSavedQuoteById(dbInstance, savedQuoteId, updatedQuote) {
    return dbInstance
            .from('saved_quotes')
            .where('id', savedQuoteId)
            .update(updatedQuote)
            .returning('*');
  },
  deleteSavedQuoteById(dbInstance, savedQuoteId) {
    return dbInstance
            .from('saved_quotes')
            .where({'id' : savedQuoteId})
            .del();
  }
}

module.exports = SaveQuoteServices;