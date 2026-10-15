import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects, createProject, deleteProject } from "../api/projects";

function getErrorMessage(error, fallback) {
  if (error?.message === "Failed to fetch") {
    return "서버에 연결할 수 없습니다. 연결 상태를 확인해주세요.";
  }

  return error?.message || fallback;
}

function Projects({ projects, setProjects }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [deletingProjectId, setDeletingProjectId] = useState(null);
  // 검색, 필터, 정렬 상태
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // 프로젝트 목록 조회
  useEffect(() => {
    let isActive = true;

    setIsLoading(true);
    setError("");

    getProjects()
      .then((data) => {
        if (isActive) {
          setProjects(data);
        }
      })
      .catch((error) => {
        if (isActive) {
          setError(getErrorMessage(error, "프로젝트를 불러오지 못했습니다."));
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [setProjects, loadAttempt]);

  // 프로젝트 상태 필터 옵션
  const statuses = [
    ...new Set(projects.map((project) => project.status).filter(Boolean)),
  ];

  // 검색 및 상태 필터 적용
  const filteredProjects = projects
    .filter((project) => {
      const keyword = searchTerm.trim().toLowerCase();

      const matchesSearch = [
        project.name,
        project.description,
        project.manager,
      ].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(keyword),
      );

      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return (a.name || "").localeCompare(b.name || "", "ko");
      }

      if (sortBy === "progress-asc") {
        return Number(a.progress || 0) - Number(b.progress || 0);
      }

      if (sortBy === "progress-desc") {
        return Number(b.progress || 0) - Number(a.progress || 0);
      }

      return Number(b.id) - Number(a.id);
    });

  // 프로젝트 생성
  async function handleCreateProject() {
    if (!projectName.trim()) {
      setCreateError("프로젝트 이름을 입력해주세요.");
      return;
    }

    setIsCreating(true);
    setCreateError("");

    try {
      const data = await createProject({
        name: projectName.trim(),
        description: "새로운 프로젝트",
        progress: 0,
        status: "진행 중",
        manager: "",
        startDate: "",
        dueDate: "",
      });

      setProjects((currentProjects) => [...currentProjects, data]);
      setProjectName("");
      setIsModalOpen(false);
    } catch (error) {
      setCreateError(getErrorMessage(error, "프로젝트를 만들지 못했습니다."));
    } finally {
      setIsCreating(false);
    }
  }

  // 프로젝트 삭제
  async function handleDeleteProject(id) {
    if (!window.confirm("정말 이 프로젝트를 삭제하시겠습니까?")) {
      return;
    }

    setDeletingProjectId(id);

    try {
      await deleteProject(id);

      setProjects((currentProjects) =>
        currentProjects.filter((project) => project.id !== id),
      );
    } catch (error) {
      window.alert(getErrorMessage(error, "프로젝트를 삭제하지 못했습니다."));
    } finally {
      setDeletingProjectId(null);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        {/* 페이지 상단 */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500">WORKSPACE</p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">프로젝트</h1>
          </div>

          <button
            type="button"
            onClick={() => {
              setCreateError("");
              setIsModalOpen(true);
            }}
            className="rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            + 프로젝트 만들기
          </button>
        </div>

        {/* 로딩, 오류, 빈 상태, 프로젝트 목록 */}
        {isLoading ? (
          <p className="mt-10 text-gray-500" role="status">
            프로젝트를 불러오는 중...
          </p>
        ) : error ? (
          <div className="mt-10">
            <p className="text-red-500" role="alert">
              {error}
            </p>

            <button
              type="button"
              onClick={() => {
                setLoadAttempt((current) => current + 1);
              }}
              className="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
            >
              다시 시도
            </button>
          </div>
        ) : projects.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
            <p className="text-lg font-semibold">아직 프로젝트가 없습니다.</p>

            <p className="mt-2 text-sm text-gray-500">
              새 프로젝트를 만들어 업무를 관리해보세요.
            </p>
          </div>
        ) : (
          <div className="mt-10">
            {/* 검색, 상태 필터, 정렬 */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label
                  htmlFor="projectSearch"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  프로젝트 검색
                </label>

                <input
                  id="projectSearch"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="이름, 설명, 담당자 검색"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              <div>
                <label
                  htmlFor="statusFilter"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  상태별 필터
                </label>

                <select
                  id="statusFilter"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                >
                  <option value="all">전체 상태</option>

                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="projectSort"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  정렬
                </label>

                <select
                  id="projectSort"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                >
                  <option value="recent">최근 등록순</option>
                  <option value="name">이름순</option>
                  <option value="progress-asc">진행률 낮은순</option>
                  <option value="progress-desc">진행률 높은순</option>
                </select>
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              프로젝트 {filteredProjects.length}개
            </p>

            {filteredProjects.length === 0 ? (
              <p className="mt-4 rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
                검색 결과가 없습니다.
              </p>
            ) : (
              <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-gray-400 hover:shadow-md"
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
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={deletingProjectId === project.id}
                      onClick={() => handleDeleteProject(project.id)}
                      className="mt-6 text-sm text-gray-500 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingProjectId === project.id ? "삭제 중..." : "삭제"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 프로젝트 생성 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">새 프로젝트</h2>

              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setCreateError("");
                }}
                className="text-gray-400 hover:text-black"
                aria-label="모달 닫기"
              >
                ✕
              </button>
            </div>

            <div className="mt-6">
              <label htmlFor="projectName" className="text-sm font-medium">
                프로젝트 이름
              </label>

              <input
                id="projectName"
                type="text"
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
                placeholder="프로젝트 이름을 입력하세요"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {createError && (
              <p className="mt-3 text-sm text-red-500" role="alert">
                {createError}
              </p>
            )}

            <button
              type="button"
              disabled={isCreating}
              onClick={handleCreateProject}
              className="mt-6 w-full rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isCreating ? "만드는 중..." : "프로젝트 만들기"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Projects;
