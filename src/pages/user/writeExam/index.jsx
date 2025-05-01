import React, { useState } from 'react'
import Instruction from './instruction'
import Question from './Question'
import Result from './Result'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { addReport } from '../../../apiCalls/reports'
import { setAddReport } from '../../../redux/reports'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

function WriteExam() {
  const { t } = useTranslation();
  const exam = useSelector((state) => state.exam.getExamById)
  const user = useSelector((state) => state.user.user)
  const [view, setView] = useState('instruction')
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [result, setResult] = useState(null);
  const dispatch = useDispatch()
  const calculateResult = async() => {
    try {
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let unattempted = 0;

    exam?.questions?.forEach(question => {
        const selectedAnswer = selectedAnswers[question._id];
        if (selectedAnswer) {
            if (selectedAnswer.optionNumber === question.answer) {
                correctAnswers++;
            } else {
                wrongAnswers++;
            }
        } else {
            unattempted++;
        }
    });

    const totalMarks = exam?.questions?.length * 2;
    const marksObtained = correctAnswers * 2;
    const passPercentage = marksObtained / totalMarks * 100;
    const verdict = passPercentage >= 50 ? t('USER_WRITE_EXAM.VERDICT.PASS') : t('USER_WRITE_EXAM.VERDICT.FAIL');

    const tempResult = {
      totalMarks,
      marksObtained,
      wrongAnswers,
      unattempted,
      verdict
  }

    setResult(tempResult);
    const response = await addReport({
      examId: exam._id,
      userId: user._id,
      marksObtained: tempResult.marksObtained,
      totalMarks: tempResult.totalMarks,
      verdict: tempResult.verdict
    });
    if(response.success){
      setView('result');
      console.log(response.report)
      dispatch(setAddReport(response.report))
      toast.success(response.message);
    }else{
      toast.error(response.message);
    }
  } catch (error) {
    toast.error(error);
  }
  };

  return (
    exam && (
    <div>
        <div className="divider">

        </div>
        <hr style={{ marginTop: '10px' }} />
        <h1 className="text-center">
            {exam?.name}
        </h1>
        <hr style={{ margin: '0px' }} />
      {view === 'instruction' && <Instruction exam={exam} setView={setView} />}
      {view === 'question' && <Question exam={exam} setView={setView} selectedQuestion={selectedQuestion} setSelectedQuestion={setSelectedQuestion} selectedAnswers={selectedAnswers} setSelectedAnswers={setSelectedAnswers} calculateResult={calculateResult} />}
      {view === 'result' && <Result result={result} setView={setView} />}
    </div>
    )
  )
}

export default WriteExam
