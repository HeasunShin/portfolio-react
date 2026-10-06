"use strict";

var db = require("./database");

var projects = [{
  id: 1,
  name: "웹사이트 리뉴얼",
  description: "새로운 기업 홈페이지 제작 프로젝트",
  progress: 72,
  status: "진행 중",
  manager: "김민수",
  startDate: "2026-06-01",
  dueDate: "2026-09-30"
}, {
  id: 2,
  name: "모바일 앱 개발",
  description: "서비스 모바일 앱 개발 프로젝트",
  progress: 45,
  status: "진행 중",
  manager: "이서연",
  startDate: "2026-07-15",
  dueDate: "2026-11-30"
}, {
  id: 3,
  name: "브랜드 가이드 제작",
  description: "브랜드 디자인 시스템 구축 프로젝트",
  progress: 100,
  status: "완료",
  manager: "박지훈",
  startDate: "2026-03-01",
  dueDate: "2026-05-31"
}];
var insertProject = db.prepare("\n  INSERT OR IGNORE INTO projects\n  (id, name, description, progress, status, manager, startDate, dueDate)\n  VALUES (?, ?, ?, ?, ?, ?, ?, ?)\n");

for (var _i = 0, _projects = projects; _i < _projects.length; _i++) {
  var project = _projects[_i];
  insertProject.run(project.id, project.name, project.description, project.progress, project.status, project.manager, project.startDate, project.dueDate);
}

console.log("초기 프로젝트 데이터 입력 완료");