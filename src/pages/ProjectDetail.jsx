import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProject } from "../api/projects";

function ProjectDetail() {
  // 현재 URL에 들어있는 :id를 가져옴
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProject(id)
      .then((data) => {
        setProject(data);
        setIsLoading(false);
      })
      .catch(() => {
        setProject(null);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gray-500">프로젝트를 불러오는 중...</p>
        </div>
      </main>
    );
  }

  // 프로젝트가 없을때 안내 화면
  if (!project) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-2xl font-bold">프로젝트를 찾을 수 없습니다.</h1>

          <Link
            to="/projects"
            className="mt-4 inline-block text-sm text-gray-500 hover:text-black"
          >
            프로젝트 목록으로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/projects" className="hover:text-black">
            프로젝트
          </Link>

          <span>/</span>

          <span>{project.name}</span>
        </div>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500">
                {project.status}
              </p>

              <h1 className="mt-2 text-3xl font-bold">{project.name}</h1>

              <p className="mt-3 text-gray-600">{project.description}</p>
            </div>

            <Link
              to={`/projects/${project.id}/edit`}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              수정
            </Link>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">진행률</span>
              <span className="text-gray-500">{project.progress}%</span>
            </div>

            <div className="mt-3 h-2 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-black"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-6 border-t border-gray-100 pt-6 text-sm">
            <div>
              <p className="text-gray-500">담당자</p>
              <p className="mt-1 font-medium">{project.manager}</p>
            </div>

            <div>
              <p className="text-gray-500">시작일</p>
              <p className="mt-1 font-medium">{project.startDate}</p>
            </div>

            <div>
              <p className="text-gray-500">마감일</p>
              <p className="mt-1 font-medium">{project.dueDate}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProjectDetail;
