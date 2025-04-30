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
import { ADD_EDIT_EXAM, TOAST_MESSAGES } from '../../../utils/constants';

function AddEditExam() {
    const allQuestions = useSelector((state) => state.question.allQuestions) || [];
    const dispatch = useDispatch();
    const params = useParams();
    const isEdit = params.id
    const [showModal, setShowModal] = useState(false);
    const [examData, setExamData] = useState(null);
    const [questionData, setQuestionData] = useState(null);
    const onFinish = async (values) => {
        try {
            toast.loading(isEdit ? TOAST_MESSAGES.UPDATING_EXAM : TOAST_MESSAGES.ADDING_EXAM);
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
                setExamData(response?.exams);
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
                dispatch(setAllQuestions(response.questions));
                setQuestionData(response.questions);
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if ( isEdit ) {
            fetchAllQuestions();
        }
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
        setQuestionData(question);
        setShowModal(true);
    }

    const handleAddQuestion = () => {
        setQuestionData(null);
        setShowModal(true);
    }

    return (
        <div>
            <PageTitle title={isEdit ? ADD_EDIT_EXAM.PAGE_TITLE_EDIT : ADD_EDIT_EXAM.PAGE_TITLE_ADD} />
            {(examData || !params.id) && (
            <Form layout="vertical" onFinish={onFinish} initialValues={examData}>
                <Tabs defaultActiveKey="1" >
                    <Tabs.TabPane tab={ADD_EDIT_EXAM.TABS.EXAM_DETAILS} key="1">
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item label={ADD_EDIT_EXAM.FORM_LABELS.EXAM_NAME} name="name">
                                    <Input className='w-full input-border' type="text" placeholder={ADD_EDIT_EXAM.FORM_PLACEHOLDERS.EXAM_NAME} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={ADD_EDIT_EXAM.FORM_LABELS.EXAM_DURATION} name="duration">
                                    <Input className='w-full input-border' type="number" placeholder={ADD_EDIT_EXAM.FORM_PLACEHOLDERS.EXAM_DURATION} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={ADD_EDIT_EXAM.FORM_LABELS.EXAM_CATEGORY} name="category">
                                    <Select className='w-full input-border border-rounded' placeholder={ADD_EDIT_EXAM.FORM_PLACEHOLDERS.EXAM_CATEGORY} options={[
                                        {
                                            label: ADD_EDIT_EXAM.CATEGORY_LABELS.JAVASCRIPT,
                                            value: 'javascript'
                                        },
                                        {
                                            label: ADD_EDIT_EXAM.CATEGORY_LABELS.REACT,
                                            value: 'react'
                                        },
                                        {
                                            label: ADD_EDIT_EXAM.CATEGORY_LABELS.NODE,
                                            value: 'node'
                                        },
                                        {
                                            label: ADD_EDIT_EXAM.CATEGORY_LABELS.MONGO,
                                            value: 'mongodb'
                                        },
                                        {
                                            label: ADD_EDIT_EXAM.CATEGORY_LABELS.PYTHON,
                                            value: 'python'
                                        }
                                    ]} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={ADD_EDIT_EXAM.FORM_LABELS.TOTAL_MARKS} name="totalMarks">
                                    <Input type="number" placeholder={ADD_EDIT_EXAM.FORM_PLACEHOLDERS.TOTAL_MARKS} className='w-full input-border' />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={ADD_EDIT_EXAM.FORM_LABELS.PASSING_MARKS} name="passingMarks">
                                    <Input type="number" placeholder={ADD_EDIT_EXAM.FORM_PLACEHOLDERS.PASSING_MARKS} className='w-full input-border' />
                                </Form.Item>
                            </Col>

                        </Row>
                        <div className='flex justify-end mt-4'>
                            <Button type='primary' htmlType='submit'>{isEdit ? ADD_EDIT_EXAM.FORM_BUTTONS.UPDATE_EXAM : ADD_EDIT_EXAM.FORM_BUTTONS.ADD_EXAM}</Button>
                        </div>
                    </Tabs.TabPane>
                    {params.id && (
                        <Tabs.TabPane tab={ADD_EDIT_EXAM.TABS.QUESTIONS} key="2">
                            <div className='flex flex-col'>
                                <div className='flex justify-between items-center gap-4'>
                                    <h1>{ADD_EDIT_EXAM.QUESTIONS}</h1>
                                    <Button type='primary' onClick={handleAddQuestion}>{ADD_EDIT_EXAM.QUESTIONS_TAB.ADD_QUESTION}</Button>
                                </div>
                                <div className='allQuestions'>
                                    {allQuestions.map((question, index) => (
                                        <div key={question._id} className='allQuestions'>
                                            <h3 className='text-lg font-bold'><span className='text-primary underline'>{ADD_EDIT_EXAM.QUESTION_MODEL.QUESTION} {index + 1}:</span> {question.question}</h3>
                                            <p>{ADD_EDIT_EXAM.QUESTION_MODEL.OPTIONS}: {question.options.map((option, index) => <span className='flex flex-col' key={index}>{index + 1}. {option}</span>)}</p>
                                            <p>{ADD_EDIT_EXAM.QUESTION_MODEL.ANSWER}: {question.answer}</p>
                                            <div className='flex justify-between items-center gap-4'>
                                            <p>{ADD_EDIT_EXAM.QUESTION_MODEL.EXPLANATION}: {question.explanation}</p>
                                            <div className='flex justify-end gap-1'>
                                                <Button type='primary' onClick={() => handleEditQuestion(question)}>{ADD_EDIT_EXAM.BUTTONS.EDIT}</Button>
                                                <Button type='primary' onClick={() => handleDeleteQuestion(question._id)}>{ADD_EDIT_EXAM.BUTTONS.DELETE}</Button>
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
