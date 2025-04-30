import React, { useEffect, useState } from 'react'
import PageTitle from '../../../components/pageTitle'
import { useSelector } from 'react-redux'
import { Table } from 'antd'
import { getReportByUserId } from '../../../apiCalls/reports'
import toast from 'react-hot-toast'
import moment from 'moment'
import { USER_REPORTS, TOAST_MESSAGES } from '../../../utils/constants'

function UserReports() {
    const reports = useSelector((state) => state?.reports?.addReport)
    const [reportsData, setReportsData] = useState([])

    useEffect(() => {
        getAllReportsDatabyUserId()
    }, [])

    const getAllReportsDatabyUserId = async () => {
        try {
            toast.loading(TOAST_MESSAGES.LOADING)
            const response = await getReportByUserId()
            if (response.success) {
                toast.dismiss()
                setReportsData(Array.isArray(response.reports) ? response.reports : [])
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
            title: USER_REPORTS.COLUMNS.EXAM_NAME,
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
            title: USER_REPORTS.COLUMNS.CATEGORY,
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
            title: USER_REPORTS.COLUMNS.DATE,
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => moment(text).format('DD-MM-YYYY')
        },
        {
            title: USER_REPORTS.COLUMNS.TOTAL_MARKS,
            dataIndex: 'totalMarks',
            key: 'totalMarks'
        },
        {
            title: USER_REPORTS.COLUMNS.MARKS_OBTAINED,
            dataIndex: 'marksObtained',
            key: 'marksObtained'
        },
        {
            title: USER_REPORTS.COLUMNS.VERDICT,
            dataIndex: 'verdict',
            key: 'verdict',
            render: (verdict) => (
                <span style={{ color: verdict === 'Pass' ? 'green' : 'red' }}>
                    {verdict}
                </span>
            )
        }
    ]

    const tableData = Array.isArray(reports) ? reports : (Array.isArray(reportsData) ? reportsData : [])

    return (
        <div>
            <PageTitle title={USER_REPORTS.PAGE_TITLE} />
            <hr />
            <Table 
                columns={columns} 
                dataSource={tableData}
                rowKey="_id"
                loading={!tableData.length}
            />
        </div>
    )
}

export default UserReports
