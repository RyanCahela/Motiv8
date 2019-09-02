# Motiv8 API

API for Motiv8

[Motiv8 Front-End Repository](https://github.com/RyanCahela/motiv8-frontend)

## Tech Stack

- [Node](https://github.com/nodejs/node)
- [Express](https://github.com/expressjs/express)
- [PostgreSQL](https://www.postgresql.org/)
- [Knex.js](https://knexjs.org/)

```
/api
|
├── /quotes
│   └── GET 
│       └── /
│   └── POST 
│       └── /
│   └── PATCH 
│       └── /
│   └── DELETE 
│       └── /:quoteId
|
├── /savedQuotes
│   └── GET
│       └── /:username (auth required)
│   └── POST
│       └── /          (auth required)
│   └── PATCH
│       └── /          (auth required)
│   └── DELETE
│       └── /          (auth required)
|
├── /users
│   └── GET
│       └── /:username (auth required)
│   └── POST
│       └── /
│   └── POST
│       └── /login
│   └── PATCH
│       └── /:username (auth required)
│   └── DELETE
│       └── /:username (auth required)
```