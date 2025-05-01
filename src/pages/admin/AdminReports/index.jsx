import React, { useEffect, useState } from 'react'
import PageTitle from '../../../components/pageTitle'
import { useSelector } from 'react-redux'
import { Button, Table } from 'antd'
import { getAllReports, getAllReportsWithSearch } from '../../../apiCalls/reports'
import toast from 'react-hot-toast'
import moment from 'moment'
import { setGetAllReportsData } from '../../../redux/reports';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

function AdminReports() {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const reports = useSelector((state) => state?.reports?.addReport)
    const getAllReportsDataAdmin = useSelector((state) => state?.reports?.getAllReportsData)
    const [search, setSearch] = useState({
        exam: '',
        user: ''
    })

    useEffect(() => {
        getAllReportsData()
    }, [])

    const getAllReportsData = async () => {
        try {
            toast.loading(t('TOAST_MESSAGES.LOADING'))
            const response = await getAllReports()
            if (response.success) {
                toast.dismiss()
                dispatch(setGetAllReportsData(response.reports))
                toast.success(response.message)
            } else {
                toast.dismiss()
                toast.error(response.message)
            }
        } catch (error) {
            toast.dismiss()
            toast.error(error.message)
        }
    }

    const getAllReportsWithSearchData = async () => {
        try {
            toast.loading(t('TOAST_MESSAGES.LOADING'))
            const response = await getAllReportsWithSearch(search)
            if (response.success) {
                toast.dismiss()
                dispatch(setGetAllReportsData(response.reports))
                toast.success(response.message)
            } else {
                toast.dismiss()
                toast.error(response.message)
            }
        } catch (error) {
            toast.dismiss()
            toast.error(error.message)
        }
    }

    const columns = [
        {
            title: t('ADMIN_REPORTS.COLUMNS.EXAM_NAME'),
            dataIndex: 'examId',
            key: 'examId',
            render: (examId) => {
                return (
                    <div>
                        <p>{examId?.name}</p>
                    </div>
                )
            }
        },
        {
            title: t('ADMIN_REPORTS.COLUMNS.USER_NAME'),
            dataIndex: 'userId',
            key: 'userId',
            render: (userId) => {
                return (
                    <div>
                        <p>{userId?.name}</p>
                    </div>
                )
            }
        },
        {
            title: t('ADMIN_REPORTS.COLUMNS.CATEGORY'),
            dataIndex: 'examId',
            key: 'category',
            render: (examId) => {
                return (
                    <div>
                        <p>{examId?.category}</p>
                    </div>
                )
            }
        },
        {
            title: t('ADMIN_REPORTS.COLUMNS.DATE'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => moment(text).format('DD-MM-YYYY')
        },
        {
            title: t('ADMIN_REPORTS.COLUMNS.TOTAL_MARKS'),
            dataIndex: 'totalMarks',
            key: 'totalMarks'
        },
        {
            title: t('ADMIN_REPORTS.COLUMNS.MARKS_OBTAINED'),
            dataIndex: 'marksObtained',
            key: 'marksObtained'
        },
        {
            title: t('ADMIN_REPORTS.COLUMNS.VERDICT'),
            dataIndex: 'verdict',
            key: 'verdict',
            render: (verdict) => (
                <span style={{ color: verdict === 'Pass' ? 'green' : 'red' }}>
                    {verdict}
                </span>
            )
        }
    ]

    const tableData = Array.isArray(reports) ? reports : (Array.isArray(getAllReportsDataAdmin) ? getAllReportsDataAdmin : [])

    return (
        <div>
            <PageTitle title={t('ADMIN_REPORTS.PAGE_TITLE')} />
            <hr />
            <div className='flex gap-2 mt-4 mb-4 w-75'>
                <input type="text" placeholder={t('ADMIN_REPORTS.SEARCH_PLACEHOLDER.EXAM')} onChange={(e) => setSearch({ ...search, exam: e.target.value })} value={search.exam} />
                <input type="text" placeholder={t('ADMIN_REPORTS.SEARCH_PLACEHOLDER.USER')} onChange={(e) => setSearch({ ...search, user: e.target.value })} value={search.user} />
                <Button type='primary' onClick={getAllReportsWithSearchData}>{t('ADMIN_REPORTS.SEARCH_BUTTON')}</Button>
            </div>
            <Table 
                columns={columns} 
                dataSource={tableData}
                rowKey="_id"
                loading={!tableData.length}
            />
        </div>
    )
}

export default AdminReports
