"use strict";

var Database = require("better-sqlite3");

var db = new Database("teamflow.db"); // DB 안에 실제로 데이터를 담을 공간(테이블)을 생성
// projects라는 테이블이 없으면 만들어

db.exec("\n  CREATE TABLE IF NOT EXISTS projects ( \n    id INTEGER PRIMARY KEY,\n    name TEXT NOT NULL,\n    description TEXT,\n    progress INTEGER,\n    status TEXT,\n    manager TEXT,\n    startDate TEXT,\n    dueDate TEXT\n  )\n");
db.exec("\n  CREATE TABLE IF NOT EXISTS users (\n    id INTEGER PRIMARY KEY,\n    name TEXT NOT NULL,\n    email TEXT NOT NULL UNIQUE,\n    password TEXT NOT NULL\n  )\n");
module.exports = db;