"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.getCurrentUser = getCurrentUser;

// const API_URL = import.meta.env.VITE_API_URL;
function createUser(user) {
  return fetch("".concat(API_URL, "/users"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }).then(function _callee(response) {
    var data;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(response.json());

          case 2:
            data = _context.sent;

            if (response.ok) {
              _context.next = 5;
              break;
            }

            throw new Error(data.message);

          case 5:
            return _context.abrupt("return", data);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  });
}

function loginUser(user) {
  return fetch("".concat(API_URL, "/users/login"), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }).then(function _callee2(response) {
    var data;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(response.json());

          case 2:
            data = _context2.sent;

            if (response.ok) {
              _context2.next = 5;
              break;
            }

            throw new Error(data.message);

          case 5:
            return _context2.abrupt("return", data);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
}

function getCurrentUser() {
  return fetch("".concat(API_URL, "/users/me"), {
    credentials: "include"
  }).then(function _callee3(response) {
    var data;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(response.json());

          case 2:
            data = _context3.sent;

            if (response.ok) {
              _context3.next = 5;
              break;
            }

            throw new Error(data.message);

          case 5:
            return _context3.abrupt("return", data);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
}