import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllExams } from '../../../apiCalls/exams'
import toast from 'react-hot-toast'
import moment from 'moment'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { setExam } from '../../../redux/exams'
import { useDispatch } from 'react-redux'
import { ROUTES } from '../../../utils/constants'
import { useTranslation } from 'react-i18next'

function Home() {
  const { t } = useTranslation();
  const user = useSelector((state) => state?.user?.user?.name)
  const [exams, setExams] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchAllExams = async () => {
    try {
      const response = await getAllExams()
      if (response.success) {
        setExams(response.exams)
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllExams()
  }, [])

  return (
    <div>
      <h1>{t('HOME.WELCOME_MESSAGE')} {user},</h1>
      <div>
        {exams?.map((exam) => (
          <div key={exam._id} className='exam-card'>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>{t('HOME.EXAM_CARD.EXAM_NAME')}: {exam.name}</h3>
            <hr />
            <p>{t('HOME.EXAM_CARD.EXAM_CATEGORY')}: {exam.category}</p>
            <p>{t('HOME.EXAM_CARD.EXAM_DURATION')}: {exam.duration}</p>
            <p>{t('HOME.EXAM_CARD.TOTAL_QUESTIONS')}: {exam.questions.length}</p>
            <p>{t('HOME.EXAM_CARD.TOTAL_MARKS')}: {exam.totalMarks}</p>
            <p>{t('HOME.EXAM_CARD.PASSING_MARKS')}: {exam.passingMarks}</p>
            <p>{t('HOME.EXAM_CARD.CREATED_AT')}: {moment(exam.createdAt).format('DD-MM-YYYY HH:mm')}</p>
            <p>{t('HOME.EXAM_CARD.UPDATED_AT')}: {moment(exam.updatedAt).format('DD-MM-YYYY HH:mm')}</p>
            <Button 
              type='primary' 
              onClick={() => {
                dispatch(setExam(exam))
                navigate(ROUTES.PROTECTED.USER.WRITE_EXAM.replace(':id', exam._id))
              }}
            >
              {t('HOME.BUTTONS.START_EXAM')}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home;
