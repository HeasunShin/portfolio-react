import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getCurrentUser } from "./api/users";

import Layout from "./components/Layout";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectEdit from "./pages/ProjectEdit";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  // 데이터 끌어올리기(프로젝트 데이터를 App에서 관리하도록 끌어올림)
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout user={user} setUser={setUser} />}>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Features />
              </>
            }
          />
          <Route
            path="/projects"
            element={<Projects projects={projects} setProjects={setProjects} />}
          />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          {/* 데이터 끌어올리기(ProjectEdit에 프로젝트 데이터와 수정 함수를 전달) */}
          <Route
            path="/projects/:id/edit"
            element={<ProjectEdit setProjects={setProjects} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
