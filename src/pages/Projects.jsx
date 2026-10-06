import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects, createProject, deleteProject } from "../api/projects";

function Projects({ projects, setProjects }) {
  // 프로젝트 목록 배열 projects.js로 이동

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("프로젝트를 불러오지 못했습니다.");
        setIsLoading(false);
      });
  }, []);
  // [] : Projects가 처음 화면에 나타날 때 실행 ([]를 없애면 컴포넌트가 렌더링될 때마다 실행, [값] 값이 변경될 때 실행)

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* 페이지 상단 */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500">WORKSPACE</p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">프로젝트</h1>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            + 프로젝트 만들기
          </button>
        </div>

        {isLoading ? (
          <p className="mt-10 text-gray-500">프로젝트를 불러오는 중...</p>
        ) : error ? (
          <p className="mt-10 text-red-500">{error}</p>
        ) : projects.length === 0 ? (
          <p className="mt-10 text-gray-500">
            아직 등록된 프로젝트가 없습니다.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 프로젝트 목록 */}
            {projects.map((project) => (
              <div
                to={`/projects/${project.id}`}
                key={project.id}
                className="block rounded-2xl border border-gray-200 bg-white p-6 hover:border-gray-400 hover:shadow-md transition"
              >
                <Link to={`/projects/${project.id}`} className="block">
                  <p className="text-sm text-gray-500">{project.status}</p>

                  <h2 className="mt-2 text-xl font-bold">{project.name}</h2>

                  <p className="mt-3 text-sm text-gray-500">
                    {project.description}
                  </p>
                </Link>

                <div className="mt-6">
                  <div className="flex justify-between text-sm">
                    <span>진행률</span>
                    <span>{project.progress}%</span>
                  </div>

                  <div className="mt-2 h-2 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-black"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      !window.confirm("정말 이 프로젝트를 삭제하시겠습니까?")
                    ) {
                      return;
                    }
                    deleteProject(project.id)
                      .then(() => {
                        setProjects((currentProjects) =>
                          currentProjects.filter(
                            (item) => item.id !== project.id,
                          ),
                        );
                      })
                      .catch((error) => {
                        alert(error.message);
                      });
                  }}
                  className="mt-6 text-sm text-gray-500 hover:text-red-500"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* 조건부 랜더링  */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 px-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">새 프로젝트</h2>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium">프로젝트 이름</label>

              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="프로젝트 이름을 입력하세요"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                if (!projectName.trim()) return;

                createProject({
                  name: projectName,
                  description: "새로운 프로젝트",
                  progress: 0,
                  status: "진행 중",
                  manager: "",
                  startDate: "",
                  dueDate: "",
                }).then((data) => {
                  setProjects((currentProjects) => [...currentProjects, data]);
                  setProjectName("");
                  setIsModalOpen(false);
                });
              }}
              className="mt-6 w-full rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              프로젝트 만들기
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Projects;
