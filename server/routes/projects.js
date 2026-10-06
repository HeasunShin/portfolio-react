const express = require("express");
const db = require("../database");

const router = express.Router();

// 프로젝트 전체 조회
router.get("/", (req, res) => {
  const projects = db.prepare("SELECT * FROM projects").all();

  res.json(projects);
});

// 프로젝트 상세 조회
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const project = db.prepare("SELECT * FROM projects WHERE id = ?").get(id);

  if (!project) {
    return res.status(404).json({
      message: "프로젝트를 찾을 수 없습니다.",
    });
  }

  res.json(project);
});

// 프로젝트 생성
router.post("/", (req, res) => {
  const { name, description, progress, status, manager, startDate, dueDate } =
    req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      message: "프로젝트 이름을 입력해주세요.",
    });
  }

  if (typeof progress !== "number" || progress < 0 || progress > 100) {
    return res.status(400).json({
      message: "진행률은 0에서 100 사이의 숫자여야 합니다.",
    });
  }

  const result = db
    .prepare(
      `
      INSERT INTO projects
      (name, description, progress, status, manager, startDate, dueDate)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    )
    .run(name, description, progress, status, manager, startDate, dueDate);

  res.json({
    id: result.lastInsertRowid,
    name,
    description,
    progress,
    status,
    manager,
    startDate,
    dueDate,
  });
});

// 프로젝트 삭제
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const result = db.prepare("DELETE FROM projects WHERE id = ?").run(id);

  if (result.changes === 0) {
    return res.status(404).json({
      message: "프로젝트를 찾을 수 없습니다.",
    });
  }

  res.json({
    success: true,
    deletedId: id,
  });
});

// 프로젝트 수정
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, progress, manager } = req.body;

  if (typeof progress !== "number" || progress < 0 || progress > 100) {
    return res.status(400).json({
      message: "진행률은 0에서 100 사이의 숫자여야 합니다.",
    });
  }

  const result = db
    .prepare(
      `
      UPDATE projects
      SET
        name = ?,
        description = ?,
        progress = ?,
        manager = ?
      WHERE id = ?
    `,
    )
    .run(name, description, progress, manager, id);

  if (result.changes === 0) {
    return res.status(404).json({
      message: "프로젝트를 찾을 수 없습니다.",
    });
  }

  const project = db.prepare("SELECT * FROM projects WHERE id = ?").get(id);

  res.json(project);
});

module.exports = router;
