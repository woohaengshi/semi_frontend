import Subjects from '@/components/Subjects';
import Timer from '@/components/Timer';
import React from 'react';

const subjectList = ['HTML', 'CSS', 'JS', 'Spring', 'MySQL', 'Oracle', 'React'];

const TimerPage = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <Timer size={400} maxTime={10} />
        <div className="mt-8 w-full flex justify-center">
          <Subjects subjects={subjectList} />
        </div>
      </div>
    </main>
  );
};

export default TimerPage;
