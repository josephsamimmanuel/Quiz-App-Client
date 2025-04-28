import React, { useEffect, useState } from 'react'
import PageTitle from '../../../components/pageTitle'
import { useSelector } from 'react-redux'
import { Table } from 'antd'
import { getReportByUserId } from '../../../apiCalls/reports'
import toast from 'react-hot-toast'
import moment from 'moment'

function UserReports() {
    const reports = useSelector((state) => state?.reports?.addReport)
    const [reportsData, setReportsData] = useState([])

    useEffect(() => {
        getAllReportsDatabyUserId()
    }, [])

    const getAllReportsDatabyUserId = async () => {
        try {
            toast.loading('Loading...')
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
            title: 'Exam Name',
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
            title: 'Category',
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
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => moment(text).format('DD-MM-YYYY')
        },
        {
            title: 'Total Marks',
            dataIndex: 'totalMarks',
            key: 'totalMarks'
        },
        {
            title: 'Marks Obtained',
            dataIndex: 'marksObtained',
            key: 'marksObtained'
        },
        {
            title: 'Verdict',
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
            <PageTitle title="Reports" />
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
