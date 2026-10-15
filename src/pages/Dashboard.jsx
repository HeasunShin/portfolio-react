import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../api/projects";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    getProjects()
      .then((data) => {
        if (isActive) {
          setProjects(data);
        }
      })
      .catch(() => {
        if (isActive) {
          setError("프로젝트 현황을 불러오지 못했습니다.");
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
  }, []);

  const ongoingCount = projects.filter(
    (project) => project.status === "진행 중",
  ).length;

  const completedCount = projects.filter(
    (project) => project.status === "완료",
  ).length;

  const averageProgress =
    projects.length > 0
      ? Math.round(
          projects.reduce(
            (total, project) => total + Number(project.progress || 0),
            0,
          ) / projects.length,
        )
      : 0;

  const recentProjects = [...projects]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold text-gray-500">WORKSPACE</p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">대시보드</h1>

        <p className="mt-3 text-gray-500">
          내 프로젝트의 진행 현황을 한눈에 확인하세요.
        </p>

        {isLoading ? (
          <p className="mt-10 text-gray-500" role="status">
            프로젝트 현황을 불러오는 중...
          </p>
        ) : error ? (
          <p className="mt-10 text-red-500" role="alert">
            {error}
          </p>
        ) : (
          <>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-sm text-gray-500">전체 프로젝트</p>
                <p className="mt-3 text-3xl font-bold">{projects.length}</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-sm text-gray-500">진행 중</p>
                <p className="mt-3 text-3xl font-bold">{ongoingCount}</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-sm text-gray-500">완료</p>
                <p className="mt-3 text-3xl font-bold">{completedCount}</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-sm text-gray-500">평균 진행률</p>
                <p className="mt-3 text-3xl font-bold">{averageProgress}%</p>
              </div>
            </div>

            <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">최근 프로젝트</h2>

                <Link
                  to="/projects"
                  className="text-sm text-gray-500 hover:text-black"
                >
                  전체 보기 →
                </Link>
              </div>

              {recentProjects.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-gray-500">
                    아직 등록된 프로젝트가 없습니다.
                  </p>

                  <Link
                    to="/projects"
                    className="mt-4 inline-block text-sm font-semibold underline"
                  >
                    프로젝트 만들기
                  </Link>
                </div>
              ) : (
                <div className="mt-5 divide-y divide-gray-100">
                  {recentProjects.map((project) => (
                    <Link
                      key={project.id}
                      to={`/projects/${project.id}`}
                      className="block rounded-lg px-3 py-4 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="truncate font-semibold">
                            {project.name}
                          </p>

                          <span
                            className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                              project.status === "완료"
                                ? "bg-green-100 text-green-700"
                                : project.status === "진행 중"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>

                        <p className="shrink-0 text-sm font-medium">
                          {project.progress}%
                        </p>
                      </div>

                      <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-black"
                          style={{
                            width: `${project.progress}%`,
                          }}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

export default Dashboard;
