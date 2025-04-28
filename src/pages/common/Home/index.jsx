import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllExams } from '../../../apiCalls/exams'
import toast from 'react-hot-toast'
import moment from 'moment'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { setExam } from '../../../redux/exams'
import { useDispatch } from 'react-redux'

function Home() {
  const user = useSelector((state) => state?.user?.user?.name)
  console.log('user', user)
  const [exams, setExams] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fetchAllExams = async () => {
    try {
      const response = await getAllExams()
      if (response.success) {
        setExams(response.data)
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
      <h1>Welcome {user},</h1>
      <div>
        {exams.map((exam) => (
          <div key={exam._id} className='exam-card'>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Exam Name: {exam.name}</h3>
            <hr />
            <p>Category: {exam.category}</p>
            <p>Duration: {exam.duration}</p>
            <p>Total Questions: {exam.questions.length}</p>
            <p>Total Marks: {exam.totalMarks}</p>
            <p>Passing Marks: {exam.passingMarks}</p>
            <p>Created At: {moment(exam.createdAt).format('DD-MM-YYYY HH:mm')}</p>
            <p>Updated At: {moment(exam.updatedAt).format('DD-MM-YYYY HH:mm')}</p>
            <Button 
              type='primary' 
              onClick={() => {
                dispatch(setExam(exam))
                navigate(`/user/write-exam/${exam._id}`)
              }}
            >
              Start Exam
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home;
