"use client";

// components/Timer.js
import React, { useState, useEffect, useRef } from 'react';
import * as Toggle from '@radix-ui/react-toggle';

const Timer = ({size, maxTime}) => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const radius = (size - 20) / 2; // 반지름
  const [loadingColor, setLoadingColor] = useState('#8274EA'); // 기본 로딩 색상
  const [completeColor, setCompleteColor] = useState('#8274EA'); // 완료 색상 변수
  const colorDensity = useRef(0.1);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime < maxTime) {
            return prevTime + 1; // 최대 시간 초과 시 0으로 리셋
          } else {
            setLoadingColor(getDarkerColor(loadingColor, colorDensity.current));
            colorDensity.current += 0.1;
            return 0; // 리셋 시 색상도 초기화
          }
        });

        // 시간 초과 시 색상 초기화
        if (time >= maxTime) {
          setLoadingColor('#8274EA'); // 기본 색상으로 리셋
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 클린업
  }, [isActive, time]);

  const handleToggle = () => setIsActive((prev) => !prev);

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const progress = (time / maxTime) * 100; // 진행률 계산

  // 색상을 점점 진하게 만드는 함수
  const getDarkerColor = (hex, factor) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.floor(r * (1 - factor));
    g = Math.floor(g * (1 - factor));
    b = Math.floor(b * (1 - factor));

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

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
