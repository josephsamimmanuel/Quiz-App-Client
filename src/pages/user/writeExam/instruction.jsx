import { Button } from 'antd'
import React from 'react'
import { USER_WRITE_EXAM_INSTRUCTION } from '../../../utils/constants'

function Instruction({ exam, setView }) {
  return (
    <div className="instruction-container">
      <h1 className="text-center underline">{USER_WRITE_EXAM_INSTRUCTION.PAGE_TITLE}</h1>
      <div className="instruction-list">
        <div className="instruction-item">
          <h2>{USER_WRITE_EXAM_INSTRUCTION.INSTRUCTIONS.READ_INSTRUCTIONS}</h2>
          <p>{USER_WRITE_EXAM_INSTRUCTION.INSTRUCTIONS.MAKE_SURE_UNDERSTAND}</p>
        </div>
        <div className="flex flex-col gap-2">
          <ul>
            <li>
              <p>{USER_WRITE_EXAM_INSTRUCTION.INSTRUCTIONS.EXAM_WILL_BE_CONDUCTED}</p>
            </li>
            <li>
              <p>{USER_WRITE_EXAM_INSTRUCTION.INSTRUCTIONS.EXAM_MUST_BE_COMPLETED}</p>
            </li>
            <li>
              <p>{USER_WRITE_EXAM_INSTRUCTION.INSTRUCTIONS.EXAM_WILL_BE_SUBMITTED_AUTOMATICALLY}</p>
            </li>
            <li>
              <p>{USER_WRITE_EXAM_INSTRUCTION.INSTRUCTIONS.YOU_CANNOT_SUBMIT_THE_EXAM_ONCE_IT_IS_STARTED}</p>
            </li>
            <li>
              <p>{USER_WRITE_EXAM_INSTRUCTION.INSTRUCTIONS.DO_NOT_REFRESH_THE_PAGE}</p>
            </li>
            <li>
              <p>{USER_WRITE_EXAM_INSTRUCTION.INSTRUCTIONS.DO_NOT_CLOSE_THE_TAB}</p>
            </li>
            <li>
              <p>{USER_WRITE_EXAM_INSTRUCTION.INSTRUCTIONS.DO_NOT_USE_ANY_EXTERNAL_RESOURCES}</p>
            </li>
            <li>
              <p>{USER_WRITE_EXAM_INSTRUCTION.INSTRUCTIONS.YOU_CAN_USE_THE_PREVIOUS_AND_NEXT_BUTTON_TO_NAVIGATE_THROUGH_THE_QUESTIONS}</p>
            </li>
            <li>
              <p>{USER_WRITE_EXAM_INSTRUCTION.INSTRUCTIONS.YOU_CANNOT_GO_BACK_TO_THE_PREVIOUS_QUESTION_ONCE_YOU_HAVE_SUBMITTED_THE_EXAM}</p>
            </li>
            <li>
                <p>{USER_WRITE_EXAM_INSTRUCTION.INSTRUCTIONS.TOTAL_NUMBER_OF_QUESTIONS_ARE}</p>
            </li>
            <li>
                <p>{USER_WRITE_EXAM_INSTRUCTION.INSTRUCTIONS.EACH_QUESTION_CARRY_2_MARKS}</p>
            </li>
            <li>
                <p>{USER_WRITE_EXAM_INSTRUCTION.INSTRUCTIONS.TOTAL_MARKS_ARE}</p>
            </li>
          </ul>
        </div>
        <div className="button-container">
            <p>{USER_WRITE_EXAM_INSTRUCTION.DECLARATION}</p>
            <Button variant="contained" type="primary" onClick={() => setView('question')}>{USER_WRITE_EXAM_INSTRUCTION.BUTTONS.START_EXAM}</Button>
        </div>
      </div>
    </div>
  )
}

export default Instruction
