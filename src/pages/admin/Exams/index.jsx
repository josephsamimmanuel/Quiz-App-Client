import React, { useEffect, useState } from 'react'
import PageTitle from '../../../components/pageTitle'
import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { deleteExam, getAllExams } from '../../../apiCalls/exams';
import toast from 'react-hot-toast';

function Exams() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const columns = [
    {
      title: 'Exam Name',
      dataIndex: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
    },
    {
      title: 'Passing Marks',
      dataIndex: 'passingMarks',
    },
    {
      title: 'Total Marks',
      dataIndex: 'totalMarks',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <div className='flex gap-2'>
          <Button type='primary' onClick={() => navigate(`/admin/exams/edit/${record._id}`)}>Edit</Button>
          <Button type='danger' onClick={() => handleDelete(record._id)}>Delete</Button>
        </div>
      ),
    },
  ]

  const handleDelete = async (id) => {
    try {
      const response = await deleteExam(id);
      if (response.success) {
        toast.success(response.message);
        fetchExams();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchExams = async () => {
    try {
      const response = await getAllExams();
      setExams(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <div>
      <div className='flex justify-between items-center mt-2 mb-4'>
        <PageTitle title="Exams" />
        <Button className='bg-blue-500 text-white px-4 py-2 rounded-md' onClick={() => navigate('/admin/exams/add')}>Add Exam</Button>
      </div>

      <Table columns={columns} dataSource={exams} />
    </div>
  )
}

export default Exams;
