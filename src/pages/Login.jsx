import { useState } from "react";
import { loginUser, getCurrentUser } from "../api/users";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    loginUser({
      email,
      password,
    })
      .then(async (data) => {
        alert(`${data.name}님, 로그인되었습니다.`);

        const user = await getCurrentUser();

        setUser(user);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-md px-6">
        <h1 className="mb-8 text-3xl font-bold">로그인</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">이메일</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">비밀번호</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black px-4 py-3 text-sm font-medium text-white"
          >
            로그인
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
