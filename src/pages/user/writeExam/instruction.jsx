import { Button } from 'antd'
import React from 'react'

function Instruction({ exam, setView }) {
  return (
    <div className="instruction-container">
      <h1 className="text-center underline">Instruction</h1>
      <div className="instruction-list">
        <div className="instruction-item">
          <h2>Read the instructions carefully</h2>
          <p>Make sure you understand the instructions before starting the exam.</p>
        </div>
        <div className="flex flex-col gap-2">
          <ul>
            <li>
              <p>The exam will be conducted on the basis of the questions given in the exam.</p>
            </li>
            <li>
              <p>Exam must be completed in {exam.duration} minutes.</p>
            </li>
            <li>
              <p>Exam will be submitted automatically after {exam.duration} minutes.</p>
            </li>
            <li>
              <p>You can not submit the exam once it is started.</p>
            </li>
            <li>
              <p>Do not refresh the page.</p>
            </li>
            <li>
              <p>Do not close the tab.</p>
            </li>
            <li>
              <p>Do not use any external resources.</p>
            </li>
            <li>
              <p>You can use the previous and next button to navigate through the questions.</p>
            </li>
            <li>
              <p>You can not go back to the previous question once you have submitted the exam.</p>
            </li>
            <li>
                <p>Total number of questions are {exam?.questions?.length}.</p>
            </li>
            <li>
                <p>Each question carries 2 marks.</p>
            </li>
            <li>
                <p>Total marks are {exam?.questions?.length * 2}.</p>
            </li>
          </ul>
        </div>
        <div className="button-container">
            <p>I agree to the above instructions and want to start the exam.</p>
            <Button variant="contained" type="primary" onClick={() => setView('question')}>Start Exam</Button>
        </div>
      </div>
    </div>
  )
}

export default Instruction
