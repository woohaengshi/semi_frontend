"use client";

import React, { useState } from 'react';

const Calendar = () => {
    // 상태 변수 정의
    const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜
    const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜
    const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false); // 월 선택기 열림 상태
    const [year, setYear] = useState(currentDate.getFullYear()); // 현재 년도

    // 날짜 클릭 핸들러
    const handleDateClick = (date) => {
        setSelectedDate(date); // 선택된 날짜 업데이트
    };

    // 월 변경 핸들러
    const changeMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction); // 방향에 따라 월 변경
        setCurrentDate(newDate);
    };

    // 현재 월의 모든 날짜 생성
    const renderDays = () => {
        const days = [];
        const date = new Date(currentDate);
        date.setDate(1); // 현재 월의 첫 날로 설정
    
        // 현재 월의 모든 날짜 수 계산
        const monthDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    
        // 1일의 요일을 계산
        const firstDayOfWeek = date.getDay();
    
        // 첫 번째 날짜가 시작하는 요일에 맞춰 빈 칸 추가
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="p-1"></div>); // 빈 칸 추가
        }
    
        // 현재 월의 모든 날짜 추가
        for (let day = 1; day <= monthDays; day++) {
            // 날짜를 두 자리 문자열로 포맷팅 (예: 01, 02, ..., 31)
            const formattedDay = String(day).padStart(2, '0'); 
            
            days.push(
                <div
                    key={day}
                    className="cursor-pointer p-1 h-20 hover:bg-gray-200 border border-gray-300 text-center"
                    onClick={() => handleDateClick(day)} // 클릭 시 날짜 선택
                >
                    {formattedDay}일 {/* 포맷팅된 날짜 표시 */}
                </div>
            );
        }
    
        return days;
    };
    

    // 월 선택기 열림/닫힘 토글
    const toggleMonthPicker = () => {
        setIsMonthPickerOpen(!isMonthPickerOpen);
    };

    // 월 선택기 렌더링
    const renderMonthPicker = () => {
        const months = Array.from({ length: 12 }, (_, index) => (
            <div 
                key={index} 
                className="cursor-pointer p-3 text-lg hover:bg-gray-200 flex justify-center items-center" 
                onClick={() => {
                    const newDate = new Date(year, index); // 선택한 월로 날짜 변경
                    setCurrentDate(newDate);
                    setIsMonthPickerOpen(false); // 월 선택기 닫기
                }}
            >
                {index + 1}월
            </div>
        ));

        return (
            <div className="absolute bg-white border border-gray-300 rounded shadow-lg p-2 mt-1 left-1/2 transform -translate-x-1/2">
                <div className="flex justify-between items-center mb-2">
                    <button onClick={() => setYear(year - 1)} className="bg-white border border-gray-300 p-1 rounded-full">
                    <svg 
                            xmlns="" 
                            className="h-4 w-4 mr-1" // 아이콘 크기 줄이기
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l6-6m-6 6l6 6" />
                        </svg>
                    </button>
                    <span className="text-lg">{year}년</span> {/* 현재 년도 표시 */}
                    <button onClick={() => setYear(year + 1)} className="bg-white border border-gray-300 p-1 rounded-full">
                    <svg 
                            xmlns="" 
                            className="h-4 w-4 mr-1" // 아이콘 크기 줄이기
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h12m0 0l-6 6m6-6l-6-6" />
                        </svg>
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-1">
                    {months}
                </div>
            </div>
        );
    };

    return (
        <div className="flex justify-center h-screen"> {/* 가운데 배치 설정 */}
            <div className="relative w-4/5"> {/* 캘린더 너비 설정 */}
                <div className="flex justify-between items-center mb-2">
                    <button 
                        onClick={() => changeMonth(-1)} 
                        className="bg-white border border-gray-300 p-1 rounded-full flex items-center"
                    >
                        <svg 
                            xmlns="" 
                            className="h-4 w-4 mr-1" // 아이콘 크기 줄이기
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l6-6m-6 6l6 6" />
                        </svg>
                    </button>
                    <span 
                        className="text-lg font-bold cursor-pointer"
                        onClick={toggleMonthPicker} // 클릭 시 월 선택기 열기
                    >
                        {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                    </span>
                    <button 
                        onClick={() => changeMonth(1)} 
                        className="bg-white border border-gray-300 p-1 rounded-full flex items-center"
                    >
                        <svg 
                            xmlns="" 
                            className="h-4 w-4 mr-1" // 아이콘 크기 줄이기
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h12m0 0l-6 6m6-6l-6-6" />
                        </svg>
                    </button>
                </div>
                {isMonthPickerOpen && renderMonthPicker()} {/* 월 선택기 렌더링 */}
                <div className="grid grid-cols-7 gap-1 mb-2 bg-violet-100 border rounded-lg py-4"> {/* 요일 헤더 */}
                    {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                        <div key={day} className="text-center font-bold">{day}</div>
                    ))}
                </div>
                <div className="bg-white border rounded shadow-lg p-2"> {/* 날짜 그리드 */}
                    <div className="grid grid-cols-7">
                        {renderDays()} {/* 날짜 렌더링 */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
