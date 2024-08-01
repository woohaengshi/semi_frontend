import Subjects from '@/components/subjects'
import React from 'react'
const subject = ['HTML', 'CSS', 'JS', 'Spring', 'MySQL', 'Oracle', 'React'];
const Timer = () => {
  return (
    <div>
      <div>Timer</div>
      <Subjects subjects={subject}/>
    </div>
  )
}

export default Timer