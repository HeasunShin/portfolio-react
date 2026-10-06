import { Link } from "react-router-dom";

function Features() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-widest text-gray-500">
            FEATURES
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            팀의 업무를 한 곳에서 관리하세요.
          </h2>

          <p className="mt-4 text-gray-600 leading-relaxed">
            프로젝트, 일정, 업무 진행 상황을 하나의 공간에서 관리할 수 있습니다.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Link
            to="/projects"
            className="block rounded-2xl border border-gray-200 p-6 hover:border-gray-400 hover:shadow-md transition"
          >
            <p className="text-sm font-semibold text-gray-500">PROJECT</p>

            <h3 className="mt-3 text-xl font-bold">프로젝트 관리</h3>

            <p className="mt-3 text-gray-600 leading-relaxed">
              프로젝트별 업무와 진행 상황을 한눈에 확인하고 관리할 수 있습니다.
            </p>
          </Link>

          <div className="rounded-2xl border border-gray-200 p-6">
            <p className="text-sm font-semibold text-gray-500">TASK</p>

            <h3 className="mt-3 text-xl font-bold">업무 관리</h3>

            <p className="mt-3 text-gray-600 leading-relaxed">
              담당자와 마감일을 지정하고 업무 진행 상황을 체계적으로 관리할 수
              있습니다.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6">
            <p className="text-sm font-semibold text-gray-500">TEAM</p>

            <h3 className="mt-3 text-xl font-bold">팀 협업</h3>

            <p className="mt-3 text-gray-600 leading-relaxed">
              팀원들과 업무 정보를 공유하고 프로젝트 진행 상황을 함께 확인할 수
              있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
