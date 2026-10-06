function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center py-12">
      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm font-semibold tracking-widest text-gray-500">
            TEAM MANAGEMENT PLATFORM
          </p>

          <h2 className="mt-4 text-5xl font-bold leading-tight tracking-tight">
            팀의 업무를
            <br />더 간단하게 관리하세요.
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            프로젝트부터 일정, 팀 협업까지 하나의 공간에서 관리할 수 있습니다.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800">
              무료로 시작하기
            </button>

            <button className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold hover:bg-gray-50">
              제품 살펴보기
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overview</p>
              <h3 className="mt-1 text-xl font-bold">Dashboard</h3>
            </div>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
              This week
            </span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Projects</p>
              <p className="mt-2 text-2xl font-bold">12</p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Tasks</p>
              <p className="mt-2 text-2xl font-bold">48</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Project progress</p>
              <p className="text-sm text-gray-500">72%</p>
            </div>

            <div className="mt-3 h-2 rounded-full bg-gray-200">
              <div className="h-2 w-[72%] rounded-full bg-black"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
