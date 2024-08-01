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

        // 첫 번째 행 추가: 빈 칸 처리
        let row = [];
        for (let i = 0; i < firstDayOfWeek; i++) {
            row.push(<td key={`empty-${i}`} className="p-1"></td>); // 빈 칸 추가
        }

        // 현재 월의 모든 날짜 추가
        for (let day = 1; day <= monthDays; day++) {
            // 날짜를 두 자리 문자열로 포맷팅 (예: 01, 02, ..., 31)
            const formattedDay = String(day).padStart(2, '0'); 

            row.push(
                <td
                    key={day}
                    className="cursor-pointer p-1 h-20 hover:bg-gray-200 border border-gray-300 text-center"
                    onClick={() => handleDateClick(day)} // 클릭 시 날짜 선택
                >
                    {formattedDay}일 {/* 포맷팅된 날짜 표시 */}
                </td>
            );

            // 7일마다 새로운 행 추가
            if ((day + firstDayOfWeek) % 7 === 0) {
                days.push(<tr key={`row-${Math.floor((day + firstDayOfWeek) / 7)}`}>{row}</tr>);
                row = []; // 새로운 행을 위해 초기화
            }
        }

        // 마지막 행에 남은 날짜 추가
        if (row.length > 0) {
            days.push(<tr key={`row-last`}>{row}</tr>);
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
                <table className="table-auto w-full mb-2 rounded-lg"> {/* 전체 테이블 */}
                    <thead className="bg-violet-100 rounded-t-lg"> {/* 요일 헤더 */}
                        <tr>
                            {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                                <th key={day} className={`text-center font-bold text-black p-4 ${index === 0 ? 'rounded-l-lg' : ''} ${index === 6 ? 'rounded-r-lg' : ''}`}>{day}</th> // 양끝 둥글게 처리
                            ))}
                        </tr>
                    </thead>

                    <tbody className="bg-white"> {/* 날짜 그리드 */}
                        <tr><td className='py-5'></td></tr>
                        {renderDays()} {/* 날짜 렌더링 */}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default Calendar;
