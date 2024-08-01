"use client";

// components/Timer.js
import React, { useState, useEffect, useRef } from 'react';
import * as Toggle from '@radix-ui/react-toggle';

const Timer = ({ size, maxTime }) => {
  // 타이머 활성화 상태, 시간, 로드 시간을 관리하는 상태 변수
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [loadTime, setLoadingTime] = useState(0);
  
  // 원형 타이머의 반지름 계산
  const radius = (size - 20) / 2;
  
  // 로딩 및 완료 색상 상태 변수
  const [loadingColor, setLoadingColor] = useState('#8274EA');
  const [completeColor, setCompleteColor] = useState('#8274EA');
  
  // 색상 변화 정도를 저장하는 ref
  const colorDensity = useRef(0.01);

  // 컴포넌트가 마운트될 때와 상태가 변경될 때 실행되는 효과
  useEffect(() => {
    let interval = null;

    // 타이머가 활성화된 경우
    if (isActive) {
        // 1초마다 타이머 업데이트
        interval = setInterval(() => {
            setTime((prevTime) => prevTime + 1);

            // 로드 시간 업데이트
            setLoadingTime((prevLoadingTime) => {
                // 최대 시간에 도달한 경우
                if (prevLoadingTime >= maxTime) {
                    // 색상 다크ening
                    setLoadingColor(getDarkerColor(loadingColor, colorDensity.current));
                    setCompleteColor(getDarkerColor(loadingColor, colorDensity.current));
                    colorDensity.current = Math.min(colorDensity.current + 0.1, 1); // 최대 1로 제한
                    return 0; // 로드 시간 리셋
                }
                return prevLoadingTime + 1; 
            });
        }, 1000); // 1초마다 업데이트
    } else {
        clearInterval(interval); // 타이머가 비활성화된 경우 인터벌 정리
    }

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, [isActive, loadingColor, maxTime]);

  // 토글 상태 변경 함수
  const handleToggle = () => setIsActive((prev) => !prev);

  // 시간 형식 변환 함수 (MM:SS)
  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // 진행률 계산
  const progress = (loadTime / maxTime) * 100;

  // 색상을 어둡게 만드는 함수
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
          {/* 기본 원형 배경 */}
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="#DBDBFF" strokeWidth="10" fill="none" />
          {/* 진행 상황을 나타내는 원 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={progress >= 100 ? completeColor : loadingColor}
            strokeWidth="10"
            fill="none"
            strokeDasharray={`${(progress / 100) * (2 * Math.PI * radius)} ${2 * Math.PI * radius}`}
            style={{ transition: 'stroke-dasharray 0.5s ease-in-out' }} // 애니메이션 효과
          />
        </svg>
        {/* 타이머 시간 표시 */}
        <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-gray-800">
          {formatTime(time)}
        </div>
      </div>

      {/* 시작/정지 토글 버튼 */}
      <Toggle.Root
        pressed={isActive}
        onPressedChange={handleToggle}
        className="bg-white border-2 border-customLightBlue text-customBlue px-8 py-4 rounded-full focus:outline-none transition-colors duration-300 hover:bg-purple-50 mb-4"
      >
        {isActive ? 'Pause' : 'Start'}
      </Toggle.Root>

      {/* 색상 선택기 (주석 처리됨) */}
      {/* <ColorPicker label="로딩 색상:" color={loadingColor} setColor={setLoadingColor} />
      <ColorPicker label="완료 색상:" color={completeColor} setColor={setCompleteColor} /> */}
    </div>
  );
};

// 색상 선택기 컴포넌트
const ColorPicker = ({ label, color, setColor }) => (
  <div className="mt-4">
    <label htmlFor={`${label}-colorPicker`} className="mr-2">{label}</label>
    <input
      type="color"
      id={`${label}-colorPicker`}
      value={color}
      onChange={(e) => setColor(e.target.value)} // 색상 변경 시 상태 업데이트
    />
  </div>
);

export default Timer; // Timer 컴포넌트 내보내기
