"use strict";

var express = require("express");

var bcrypt = require("bcrypt");

var db = require("../database");

var router = express.Router(); // 회원가입

router.post("/", function _callee(req, res) {
  var _req$body, name, email, password, hashedPassword, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password; // 필수값 검사

          if (!(!name || !email || !password)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "이름, 이메일, 비밀번호를 모두 입력해주세요."
          }));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 5:
          hashedPassword = _context.sent;
          _context.prev = 6;
          result = db.prepare("\n        INSERT INTO users\n        (name, email, password)\n        VALUES (?, ?, ?)\n      ").run(name, email, hashedPassword);
          res.status(201).json({
            id: result.lastInsertRowid,
            name: name,
            email: email
          });
          _context.next = 16;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](6);

          if (!(_context.t0.code === "SQLITE_CONSTRAINT_UNIQUE")) {
            _context.next = 15;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            message: "이미 사용 중인 이메일입니다."
          }));

        case 15:
          res.status(500).json({
            message: "회원가입 중 오류가 발생했습니다."
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 11]]);
}); // 로그인

router.post("/login", function _callee2(req, res) {
  var _req$body2, email, password, user, isPasswordCorrect;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

          if (!(!email || !password)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "이메일과 비밀번호를 입력해주세요."
          }));

        case 3:
          user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

          if (user) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            message: "이메일 또는 비밀번호가 올바르지 않습니다."
          }));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 8:
          isPasswordCorrect = _context2.sent;

          if (isPasswordCorrect) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            message: "이메일 또는 비밀번호가 올바르지 않습니다."
          }));

        case 11:
          req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
          };
          res.json({
            id: user.id,
            name: user.name,
            email: user.email
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get("/me", function (req, res) {
  if (!req.session.user) {
    return res.status(401).json({
      message: "로그인이 필요합니다."
    });
  }

  res.json(req.session.user);
});
module.exports = router;