"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProjects = getProjects;
exports.getProject = getProject;
exports.createProject = createProject;
exports.updateProject = updateProject;
exports.deleteProject = deleteProject;
var API_URL = "http://localhost:3001";

function request(url, options) {
  var response, error;
  return regeneratorRuntime.async(function request$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(url, options));

        case 2:
          response = _context.sent;

          if (response.ok) {
            _context.next = 8;
            break;
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          error = _context.sent;
          throw new Error(error.message);

        case 8:
          return _context.abrupt("return", response.json());

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getProjects() {
  return request("".concat(API_URL, "/projects"));
}

function getProject(id) {
  return request("".concat(API_URL, "/projects/").concat(id));
}

function createProject(project) {
  return request("".concat(API_URL, "/projects"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(project)
  });
}

function updateProject(id, project) {
  return request("".concat(API_URL, "/projects/").concat(id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(project)
  });
}

function deleteProject(id) {
  return request("".concat(API_URL, "/projects/").concat(id), {
    method: "DELETE"
  });
}