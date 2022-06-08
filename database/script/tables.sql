CREATE TABLE users (
    id serial PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL UNIQUE,
    password text NOT NULL
);

CREATE TABLE token (
    id serial PRIMARY KEY,
    "userId" integer REFERENCES users(id),
    token text NOT NULL
);

CREATE TABLE urls (
    id serial PRIMARY KEY,
    "userId" integer NOT NULL REFERENCES users(id),
    url text NOT NULL,
    "shortUrl" text NOT NULL UNIQUE,
    "visitCount" integer NOT NULL
);



