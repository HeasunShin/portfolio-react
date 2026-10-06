const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../database");

const router = express.Router();

// 회원가입
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  // 필수값 검사
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "이름, 이메일, 비밀번호를 모두 입력해주세요.",
    });
  }

  // 비밀번호 암호화
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = db
      .prepare(
        `
        INSERT INTO users
        (name, email, password)
        VALUES (?, ?, ?)
      `,
      )
      .run(name, email, hashedPassword);

    res.status(201).json({
      id: result.lastInsertRowid,
      name,
      email,
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({
        message: "이미 사용 중인 이메일입니다.",
      });
    }

    res.status(500).json({
      message: "회원가입 중 오류가 발생했습니다.",
    });
  }
});

// 로그인
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "이메일과 비밀번호를 입력해주세요.",
    });
  }

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

  if (!user) {
    return res.status(401).json({
      message: "이메일 또는 비밀번호가 올바르지 않습니다.",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "이메일 또는 비밀번호가 올바르지 않습니다.",
    });
  }
  req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
});

// 로그아웃
router.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        message: "로그아웃 중 오류가 발생했습니다.",
      });
    }

    res.json({
      message: "로그아웃되었습니다.",
    });
  });
});

router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({
      message: "로그인이 필요합니다.",
    });
  }

  res.json(req.session.user);
});

module.exports = router;
