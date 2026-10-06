import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProject, updateProject } from "../api/projects";

function ProjectEdit({ setProjects }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [manager, setManager] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getProject(id)
      .then((data) => {
        setProject(data);

        setName(data.name);
        setDescription(data.description);
        setProgress(data.progress);
        setManager(data.manager);

        setIsLoading(false);
      })
      .catch(() => {
        setError("프로젝트를 불러오지 못했습니다.");
        setIsLoading(false);
      });
  }, [id]);

  const handleSave = () => {
    if (progress < 0 || progress > 100) {
      alert("진행률은 0에서 100 사이여야 합니다.");
      return;
    }
    setIsSaving(true);
    updateProject(id, {
      name,
      description,
      progress,
      manager,
    })
      .then((data) => {
        setIsSaving(false);
        setProjects((currentProjects) =>
          currentProjects.map((item) => (item.id === data.id ? data : item)),
        );

        navigate(`/projects/${id}`);
      })
      .catch((error) => {
        setIsSaving(false);
        setError(error.message);
      });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gray-500">프로젝트를 불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-2xl font-bold text-red-500">{error}</h1>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-2xl font-bold">프로젝트를 찾을 수 없습니다.</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-2xl font-bold">프로젝트 수정</h1>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8">
          <div>
            <label className="text-sm font-medium">프로젝트명</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium">설명</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 min-h-32 w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium">진행률</label>

            <input
              type="number"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium">담당자</label>

            <input
              type="text"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(`/projects/${id}`)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              취소
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProjectEdit;
