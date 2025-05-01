import React, { useEffect, useState } from 'react'
import PageTitle from '../../../components/pageTitle'
import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { deleteExam, getAllExams } from '../../../apiCalls/exams';
import toast from 'react-hot-toast';
import { ROUTES } from '../../../utils/constants';
import { useTranslation } from 'react-i18next';

function Exams() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [exams, setExams] = useState([]);
  const columns = [
    {
      title: t('ADMIN_EXAMS.COLUMNS.EXAM_NAME'),
      dataIndex: 'name',
    },
    {
      title: t('ADMIN_EXAMS.COLUMNS.EXAM_CATEGORY'),
      dataIndex: 'category',
    },
    {
      title: t('ADMIN_EXAMS.COLUMNS.EXAM_DURATION'),
      dataIndex: 'duration',
    },
    {
      title: t('ADMIN_EXAMS.COLUMNS.PASSING_MARKS'),
      dataIndex: 'passingMarks',
    },
    {
      title: t('ADMIN_EXAMS.COLUMNS.TOTAL_MARKS'),
      dataIndex: 'totalMarks',
    },
    {
      title: t('ADMIN_EXAMS.COLUMNS.ACTIONS'),
      dataIndex: 'actions',
      render: (_, record) => (
        <div className='flex gap-2'>
          <Button type='primary' onClick={() => navigate(ROUTES.PROTECTED.ADMIN.EDIT_EXAM.replace(':id', record._id))}>{t('ADMIN_EXAMS.BUTTONS.EDIT')}</Button>
          <Button type='danger' onClick={() => handleDelete(record._id)}>{t('ADMIN_EXAMS.BUTTONS.DELETE')}</Button>
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
      setExams(response.exams);
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
        <PageTitle title={t('ADMIN_EXAMS.PAGE_TITLE')} />
        <Button className='bg-blue-500 text-white px-4 py-2 rounded-md' onClick={() => navigate(ROUTES.PROTECTED.ADMIN.ADD_EXAM)}>{t('ADMIN_EXAMS.BUTTONS.ADD_EXAM')}</Button>
      </div>

      <Table columns={columns} dataSource={exams} />
    </div>
  )
}

export default Exams;
