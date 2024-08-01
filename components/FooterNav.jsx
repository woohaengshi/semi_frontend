import React from "react";
import {
  ClockIcon,
  TrophyIcon,
  CalendarIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const FooterNav = () => {
  return (
    <div className="border-2 border-main-purple flex justify-around w-full py-3 sm:hidden">
      <Link href="/timer">
        <ClockIcon className="size-6 text-main-purple" />
      </Link>
      <Link href="/ranking">
        <TrophyIcon className="size-6 text-main-purple" />
      </Link>
      <Link href="/record">
          <CalendarIcon className="size-6 text-main-purple" />
      </Link>
      <Link href="/profile">
          <EllipsisHorizontalIcon className="size-6 text-main-purple" />
      </Link>
    </div>
  );
};

export default FooterNav;
