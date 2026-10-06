"use strict";

var express = require("express");

var db = require("../database");

var router = express.Router(); // 프로젝트 전체 조회

router.get("/", function (req, res) {
  var projects = db.prepare("SELECT * FROM projects").all();
  res.json(projects);
}); // 프로젝트 상세 조회

router.get("/:id", function (req, res) {
  var id = req.params.id;
  var project = db.prepare("SELECT * FROM projects WHERE id = ?").get(id);

  if (!project) {
    return res.status(404).json({
      message: "프로젝트를 찾을 수 없습니다."
    });
  }

  res.json(project);
}); // 프로젝트 생성

router.post("/", function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      description = _req$body.description,
      progress = _req$body.progress,
      status = _req$body.status,
      manager = _req$body.manager,
      startDate = _req$body.startDate,
      dueDate = _req$body.dueDate;

  if (!name || !name.trim()) {
    return res.status(400).json({
      message: "프로젝트 이름을 입력해주세요."
    });
  }

  if (typeof progress !== "number" || progress < 0 || progress > 100) {
    return res.status(400).json({
      message: "진행률은 0에서 100 사이의 숫자여야 합니다."
    });
  }

  var result = db.prepare("\n      INSERT INTO projects\n      (name, description, progress, status, manager, startDate, dueDate)\n      VALUES (?, ?, ?, ?, ?, ?, ?)\n    ").run(name, description, progress, status, manager, startDate, dueDate);
  res.json({
    id: result.lastInsertRowid,
    name: name,
    description: description,
    progress: progress,
    status: status,
    manager: manager,
    startDate: startDate,
    dueDate: dueDate
  });
}); // 프로젝트 삭제

router["delete"]("/:id", function (req, res) {
  var id = req.params.id;
  var result = db.prepare("DELETE FROM projects WHERE id = ?").run(id);

  if (result.changes === 0) {
    return res.status(404).json({
      message: "프로젝트를 찾을 수 없습니다."
    });
  }

  res.json({
    success: true,
    deletedId: id
  });
}); // 프로젝트 수정

router.patch("/:id", function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      name = _req$body2.name,
      description = _req$body2.description,
      progress = _req$body2.progress,
      manager = _req$body2.manager;

  if (typeof progress !== "number" || progress < 0 || progress > 100) {
    return res.status(400).json({
      message: "진행률은 0에서 100 사이의 숫자여야 합니다."
    });
  }

  var result = db.prepare("\n      UPDATE projects\n      SET\n        name = ?,\n        description = ?,\n        progress = ?,\n        manager = ?\n      WHERE id = ?\n    ").run(name, description, progress, manager, id);

  if (result.changes === 0) {
    return res.status(404).json({
      message: "프로젝트를 찾을 수 없습니다."
    });
  }

  var project = db.prepare("SELECT * FROM projects WHERE id = ?").get(id);
  res.json(project);
});
module.exports = router;