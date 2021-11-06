DROP TABLE IF EXISTS userScores;

CREATE TABLE userScores 
(
    user_id TEXT NOT NULL,
    num_killed_player INTEGER NOT NULL,
    num_killed_mon INTEGER NOT NULL,
    level INTEGER NOT NULL

);


DROP TABLE IF EXISTS users;

CREATE TABLE users 
(
    user_id TEXT PRIMARY KEY,
    password TEXT NOT NULL
);