CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE quotes (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  subcategory TEXT,
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  authorfacts TEXT,
  keywords TEXT
);

CREATE TABLE saved_quotes (
  id SERIAL PRIMARY KEY,
  background_image_url TEXT NOT NULL,
  bodyfont TEXT NOT NULL,
  authorfont TEXT NOT NULL,
  quote_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY(quote_id) REFERENCES quotes(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);