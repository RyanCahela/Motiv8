function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'test',
      password: 'password',
    },
    {
      id: 2,
      username: 'coolguy90',
      password: 'password',
    }
  ]
}

function makeQuotesArray() {
  return [
    {
      id: 1,
      category: "Inspirational",
      subcategory: "Power",
      quote: "Far better to think historically, to remember the lessons of the past. Thus, far better to conceive of power as consisting in part of the knowledge of when not to use all the power you have. Far better to be one who knows that if you reserve the power not to use all your power, you will lead others far more successfully and well.",
      author: "A Bartlett Giamatti",
      authorfacts: "",
      keywords: "Knowledge, Past, Power, Will"
    },
    {
      id: 2,
      category: "Inspirational",
      subcategory: "Education",
      quote: "A liberal education is at the heart of a civil society, and at the heart of a liberal education is the act of teaching.",
      author: "A Bartlett Giamatti",
      authorfacts: "",
      keywords: "Act, Education, Heart, Liberal, Society, Teaching"
    },
    {
      id: 3,
      category: "Inspirational",
      subcategory: "Giving",
      quote: "Teachers believe they have a gift for giving it drives them with the same irrepressible drive that drives others to create a work of art or a market or a building.",
      author: "A Bartlett Giamatti",
      authorfacts: "",
      keywords: "Art, Building, Giving, Teachers, Work"
    },
    {
      id: 4,
      category: "Inspirational",
      subcategory: "Potential",
      quote: "Teaching is an instinctual art, mindful of potential, craving of realizations, a pausing, seamless process.",
      author: "A Bartlett Giamatti",
      authorfacts: "",
      keywords: "Art, Potential, Teaching"
    },
    {
      id: 5,
      category: "Inspirational",
      subcategory: "Education",
      quote: "To the uneducated, an A is just three sticks.",
      author: "A. A. Milne",
      authorfacts: "English juvenile author  (1882 - 1956)",
      keywords: ""
    }
  ]
}

function makeSavedQuotesArray(quotes) {
  return quotes.map((quote, index) => {
    let saveQuoteId = index + 1;
    let userId = index < 3 ? 1 : 2; //switches user_id to mock multiple accounts saving quotes
    return {
      id: saveQuoteId,
      author: quote.author,
      authorfont: "Playfair Display, serif",
      background_image_url: 'https://images.unsplash.com/photo-1559439226-08cc38293b8b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjc2Mjg1fQ"',
      bodyfont: "PT Sans, sans-serif",
      quote: quote.quote,
      quote_id: quote.id,
      user_id: userId
    }
  })
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      quotes,
      users,
      saved_quotes
      RESTART IDENTITY CASCADE`
  )
}

function makeMotiv8Fixtures() {
  const testUsers = makeUsersArray();
  const testQuotes = makeQuotesArray();
  const testSavedQuotes = makeSavedQuotesArray(testQuotes);
  return { 
    testUsers, 
    testQuotes, 
    testSavedQuotes,
  }
}

function seedQuotesTable(db, quotes) {
  return db.into('quotes').insert(quotes);
}

module.exports = {
  cleanTables,
  makeUsersArray,
  makeQuotesArray,
  makeSavedQuotesArray,
  makeMotiv8Fixtures,
  seedQuotesTable,
}


