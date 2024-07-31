"use client";

// components/Timer.js
import React, { useState, useEffect } from 'react';
import * as Toggle from '@radix-ui/react-toggle';

const Timer = ({size, maxTime}) => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
//   const maxTime = 10; // 10초로 설정
//   const size = 400; // 원형 로딩바 크기
  const radius = (size - 20) / 2; // 반지름
  const [loadingColor, setLoadingColor] = useState('#8274EA'); // 기본 로딩 색상
  const [completeColor, setCompleteColor] = useState('#8274EA'); // 완료 색상 변수

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime < maxTime ? prevTime + 1 : 0)); // 최대 시간 초과 시 0으로 리셋
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 클린업
  }, [isActive]);

  const handleToggle = () => setIsActive((prev) => !prev);

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const progress = (time / maxTime) * 100; // 진행률 계산

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-4">
        <svg width={size} height={size}>
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="#DBDBFF" strokeWidth="10" fill="none" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={progress >= 100 ? completeColor : loadingColor}
            strokeWidth="10"
            fill="none"
            strokeDasharray={`${(progress / 100) * (2 * Math.PI * radius)} ${2 * Math.PI * radius}`}
            style={{ transition: 'stroke-dasharray 0.5s ease-in-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-800">
          {formatTime(time)}
        </div>
      </div>

      <Toggle.Root
        pressed={isActive}
        onPressedChange={handleToggle}
        className="bg-white border-2 border-purple-500 text-customBlue px-4 py-2 rounded-2xl focus:outline-none transition-colors duration-300 hover:bg-purple-100 mb-4"
      >
        {isActive ? 'Pause' : 'Play'}
      </Toggle.Root>

      <ColorPicker label="로딩 색상:" color={loadingColor} setColor={setLoadingColor} />
      <ColorPicker label="완료 색상:" color={completeColor} setColor={setCompleteColor} />
    </div>
  );
};

const ColorPicker = ({ label, color, setColor }) => (
  <div className="mt-4">
    <label htmlFor={`${label}-colorPicker`} className="mr-2">{label}</label>
    <input
      type="color"
      id={`${label}-colorPicker`}
      value={color}
      onChange={(e) => setColor(e.target.value)}
    />
  </div>
);

export default Timer;
