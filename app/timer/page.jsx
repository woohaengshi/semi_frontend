import Timer from "@/components/Timer";
import React from "react";
import {
  ClockIcon,
  TrophyIcon,
  CalendarIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import FooterNav from "@/components/FooterNav";

const TimerPage = () => {
  return (
    <Timer size={350} maxTime={10800} />
  );
};

export default TimerPage;
