import React, { useEffect, useState } from 'react'
import PageTitle from '../../../components/pageTitle'
import { Button, Col, Form, Input, Modal, Row, Select, Tabs } from 'antd'
import { addExam, deleteQuestion, editExam, getAllExams } from '../../../apiCalls/exams'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import QuestionModel from '../../../components/questionModel'
import { getAllQuestions } from '../../../apiCalls/exams'
import { useDispatch } from 'react-redux';
import { setAllQuestions } from '../../../redux/question';
import { useSelector } from 'react-redux';
function AddEditExam() {
    const allQuestions = useSelector((state) => state.question.allQuestions);
    console.log('allQuestions', allQuestions);
    const dispatch = useDispatch();
    const params = useParams();
    const isEdit = params.id
    const [showModal, setShowModal] = useState(false);
    console.log('params', params.id);
    const [examData, setExamData] = useState(null);
    const [questionData, setQuestionData] = useState(null);
    const onFinish = async (values) => {
        try {
            toast.loading(isEdit ? 'Updating Exam...' : 'Adding Exam...');
            const response = isEdit ? await editExam(params.id, values) : await addExam(values);
            if (response.success) {
                toast.dismiss();
                toast.success(response.message);
            } else {
                toast.dismiss();
                toast.error(response.message);
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error.message);
        }
    }

    const fetchExamData = async () => {
        try {
            const response = await getAllExams(params.id);
            if (response.success) {
                console.log('response', response.data[0]);
                setExamData(response.data[0]);
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAllQuestions = async () => {
        try {
            const response = await getAllQuestions();
            if (response.success) {
                dispatch(setAllQuestions(response.data));
                setQuestionData(response.data);
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAllQuestions();
    }, []);

    useEffect(() => {
        fetchExamData();
    }, []);

    const handleDeleteQuestion = async (questionId) => {
        try {
            const response = await deleteQuestion(questionId);
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditQuestion = (question) => {
        console.log('question', question);
        setQuestionData(question);
        setShowModal(true);
    }

    const handleAddQuestion = () => {
        setQuestionData(null);
        setShowModal(true);
    }

    return (
        <div>
            <PageTitle title={isEdit ? 'Edit Exam' : 'Add Exam'} />
            {(examData || !params.id) && (
            <Form layout="vertical" onFinish={onFinish} initialValues={examData}>
                <Tabs defaultActiveKey="1" >
                    <Tabs.TabPane tab="Exam Details" key="1">
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item label="Exam Name" name="name">
                                    <Input className='w-full input-border' type="text" placeholder="Enter Exam Name" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Exam Duration" name="duration">
                                    <Input className='w-full input-border' type="number" placeholder="Enter Exam Duration" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Category" name="category">
                                    <Select className='w-full input-border border-rounded' placeholder="Select Category" options={[
                                        {
                                            label: 'Javascript',
                                            value: 'javascript'
                                        },
                                        {
                                            label: 'React',
                                            value: 'react'
                                        },
                                        {
                                            label: 'Node',
                                            value: 'node'
                                        },
                                        {
                                            label: 'MongoDB',
                                            value: 'mongodb'
                                        },
                                        {
                                            label: 'Python',
                                            value: 'python'
                                        }
                                    ]} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Total Marks" name="totalMarks">
                                    <Input type="number" placeholder="Enter Total Marks" className='w-full input-border' />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Passing Marks" name="passingMarks">
                                    <Input type="number" placeholder="Enter Passing Marks" className='w-full input-border' />
                                </Form.Item>
                            </Col>

                        </Row>
                        <div className='flex justify-end mt-4'>
                            <Button type='primary' htmlType='submit'>{isEdit ? 'Update Exam' : 'Add Exam'}</Button>
                        </div>
                    </Tabs.TabPane>
                    {params.id && (
                        <Tabs.TabPane tab="Questions" key="2">
                            <div className='flex flex-col'>
                                <div className='flex justify-between items-center gap-4'>
                                    <h1>Questions</h1>
                                    <Button type='primary' onClick={handleAddQuestion}>Add Question</Button>
                                </div>
                                <div className='allQuestions'>
                                    {allQuestions.map((question, index) => (
                                        <div key={question._id} className='allQuestions'>
                                            <h3 className='text-lg font-bold'><span className='text-primary underline'>Question {index + 1}:</span> {question.question}</h3>
                                            <p>Options: {question.options.map((option, index) => <span className='flex flex-col' key={index}>{index + 1}. {option}</span>)}</p>
                                            <p>Answer: {question.answer}</p>
                                            <div className='flex justify-between items-center gap-4'>
                                            <p>Explanation: {question.explanation}</p>
                                            <div className='flex justify-end gap-1'>
                                                <Button type='primary' onClick={() => handleEditQuestion(question)}>Edit</Button>
                                                <Button type='primary' onClick={() => handleDeleteQuestion(question._id)}>Delete</Button>
                                            </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Tabs.TabPane>
                    )}
                </Tabs>
            </Form>
            )}
            {/* Question Model Popup Dialog */}
            <Modal open={showModal} onCancel={() => setShowModal(false)} footer={null}>
                <QuestionModel setShowModal={setShowModal} questionData={questionData} fetchAllQuestions={fetchAllQuestions}  />
            </Modal>
        </div>
    )
}

export default AddEditExam
