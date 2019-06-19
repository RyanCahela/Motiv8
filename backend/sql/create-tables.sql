CREATE TABLE quotes (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  subcategory TEXT,
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  authorFacts TEXT,
  keywords TEXT
)

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL
)

INSERT INTO users (username, password) VALUES ('ryan', 'pass');
INSERT INTO users (username, password) VALUES ('brandon', 'otherpass');


CREATE TABLE savedQuotes (
  id SERIAL PRIMARY KEY,
  backgroundImageURL TEXT NOT NULL,
  bodyFont TEXT NOT NULL,
  authorFont TEXT NOT NULL,
  userId INT,
  quoteId INT,
  FOREIGN KEY(quoteId) REFERENCES quotes(id),
  FOREIGN KEY(userId) REFERENCES users(id)
)