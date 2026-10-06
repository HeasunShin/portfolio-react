const Database = require("better-sqlite3");

const db = new Database("teamflow.db");

// DB 안에 실제로 데이터를 담을 공간(테이블)을 생성
// projects라는 테이블이 없으면 만들어
db.exec(`
  CREATE TABLE IF NOT EXISTS projects ( 
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    progress INTEGER,
    status TEXT,
    manager TEXT,
    startDate TEXT,
    dueDate TEXT
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )
`);

module.exports = db;
