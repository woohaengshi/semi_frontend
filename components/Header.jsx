"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="py-4 border-b-2 border-main-purple font-bold">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex items-center mb-4 md:mb-0 font-bold text-xl">
          {/* <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-8" />
          </Link> */}
          우리들의 행복한 시간
        </div>

        {/* Center navigation links */}
        <div className="flex justify-center space-x-4 mb-4 md:mb-0">
          <Link href="/timer">
            <h1 className={classNames(
                'tabItem text-lg md:text-base',
                { 'text-main-purple font-bold': pathname === '/timer' }
              )}>공부시작</h1>
          </Link>
          <Link href="/ranking">
            <h1 className={classNames(
                'tabItem text-lg md:text-base',
                { 'text-main-purple font-bold': pathname === '/ranking' }
              )}>순위조회</h1>
          </Link>
          <Link href="/record">
            <h1 className={classNames(
                'tabLastItem text-lg md:text-base',
                { 'text-main-purple font-bold': pathname === '/record' }
              )}>기록확인</h1>
          </Link>
        </div>

        {/* Right side component: User profile */}
        <div className="flex items-center space-x-4">
        <img src="/profile.png" alt="User Profile" className="h-8" />
        <div>
          <h1>홍길동</h1>
          <h1 className="text-gray-400">클라우드 서비스</h1>
        </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
