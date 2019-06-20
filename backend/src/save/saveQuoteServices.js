const SaveQuoteServices = {
  getSavedQuotesByUserId(dbInstance, userId) {
    console.log(userId);
    return dbInstance
            .from('savedquotes')
            .select('*')
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
  }
}

module.exports = SaveQuoteServices;