import { useState } from "react";
import { logoutUser } from "../api/users";
import { Link } from "react-router-dom";

function Header({ user, setUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center">
        {/* 로고 */}
        <Link to="/" className="text-xl font-bold">
          TEAMFLOW
        </Link>

        {/* 메뉴 */}
        <nav
          className={`${isMenuOpen ? "block" : "hidden"}
                      md:block
                      absolute md:static
                      top-20 left-0
                      w-full md:w-auto
                      py-6 md:py-0
                      md:ml-10
                      bg-white md:bg-transparent
                      border-b md:border-0
                      border-gray-200`}
        >
          <ul className="flex flex-col md:flex-row items-center gap-8 text-sm">
            <li>
              <a href="#" className="hover:text-gray-500">
                Product
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-gray-500">
                Solutions
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-gray-500">
                Pricing
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-gray-500">
                Resources
              </a>
            </li>

            {/* 모바일 메뉴 */}
            <li className="md:hidden border-t border-gray-200 pt-6 mt-2">
              <a href="#" className="hover:text-gray-500">
                로그인
              </a>
            </li>

            <li className="md:hidden">
              <button className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800">
                무료 시작
              </button>
            </li>
          </ul>
        </nav>

        {/* PC용 로그인 + 무료 시작 */}
        <div className="ml-auto hidden md:flex items-center gap-4">
          {user ? (
            <button
              type="button"
              className="text-sm hover:text-gray-500"
              onClick={() => {
                logoutUser()
                  .then(() => {
                    setUser(null);
                  })
                  .catch((error) => {
                    alert(error.message);
                  });
              }}
            >
              {user.name}님 로그아웃
            </button>
          ) : (
            <Link to="/login" className="text-sm hover:text-gray-500">
              로그인
            </Link>
          )}

          <button className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800">
            무료 시작
          </button>
        </div>

        {/* 모바일 메뉴 버튼 */}
        <button
          type="button"
          className="ml-auto md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}

export default Header;
