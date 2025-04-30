import { Button, Col, Form, Input, Row } from 'antd'
import React, { useEffect } from 'react'
import { addQuestion, editQuestion } from '../apiCalls/exams'
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setQuestions } from '../redux/question';
import { QUESTION_MODEL } from '../utils/constants';

function QuestionModel({ setShowModal, questionData, fetchAllQuestions }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const params = useParams();
    const questionId = questionData?._id;

    // Set initial values if questionData exists
    useEffect(() => {
        if (questionData) {
            form.setFieldsValue({
                question: questionData.question,
                answer: questionData.answer,
                explanation: questionData.explanation,
                option1: questionData.options[0],
                option2: questionData.options[1],
                option3: questionData.options[2],
                option4: questionData.options[3]
            });
        }
    }, [questionData, form]);

    const addQuestionHandler = async (values) => {
        try {
            const options = [
                values.option1,
                values.option2,
                values.option3,
                values.option4
            ].filter(Boolean);

            const payload = {
                ...(questionData && { examId: params.id }),
                question: values.question,
                answer: values.answer,
                explanation: values.explanation,
                options
            };

            const response = questionData 
                ? await editQuestion(questionId, payload)
                : await addQuestion(params.id, payload);

            if (response.success) {
                toast.success(response.message);
                setShowModal(false);
                dispatch(setQuestions(response.questions));
                fetchAllQuestions();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div>
            <Form 
                form={form}
                layout='vertical' 
                onFinish={addQuestionHandler}
                preserve={false}
            >
                <Form.Item 
                    label={QUESTION_MODEL.QUESTION} 
                    name='question' 
                    rules={[{ required: true, message: QUESTION_MODEL.FORM_MESSAGE.QUESTION }]}
                >
                    <Input type='text' placeholder={QUESTION_MODEL.QUESTION_PLACEHOLDER} />
                </Form.Item>
                <Form.Item 
                    label={QUESTION_MODEL.ANSWER} 
                    name='answer' 
                    rules={[{ required: true, message: QUESTION_MODEL.FORM_MESSAGE.ANSWER }]}
                >
                    <Input type='text' placeholder={QUESTION_MODEL.ANSWER_PLACEHOLDER} />
                </Form.Item>
                <Form.Item 
                    label={QUESTION_MODEL.EXPLANATION} 
                    name='explanation'
                >
                    <Input type='text' placeholder={QUESTION_MODEL.EXPLANATION_PLACEHOLDER} />
                </Form.Item>
                <Form.Item label={QUESTION_MODEL.OPTIONS}>
                    <Row gutter={[16, 16]} className='mb-2'>
                        <Col span={12}>
                            <Form.Item 
                                name='option1' 
                                rules={[{ required: true, message: QUESTION_MODEL.FORM_MESSAGE.OPTION_1 }]} 
                                noStyle
                            >
                                <Input type='text' placeholder={QUESTION_MODEL.OPTIONS_PLACEHOLDER.OPTION_1} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item 
                                name='option2' 
                                rules={[{ required: true, message: QUESTION_MODEL.OPTIONS_MESSAGE.OPTION_2 }]} 
                                noStyle
                            >
                                <Input type='text' placeholder={QUESTION_MODEL.OPTIONS_PLACEHOLDER.OPTION_2} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item 
                                name='option3' 
                                rules={[{ required: true, message: QUESTION_MODEL.OPTIONS_MESSAGE.OPTION_3 }]} 
                                noStyle
                            >
                                <Input type='text' placeholder={QUESTION_MODEL.OPTIONS_PLACEHOLDER.OPTION_3} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item 
                                name='option4' 
                                rules={[{ required: true, message: QUESTION_MODEL.OPTIONS_MESSAGE.OPTION_4 }]} 
                                noStyle
                            >
                                <Input type='text' placeholder={QUESTION_MODEL.OPTIONS_PLACEHOLDER.OPTION_4} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>
                <div className='flex justify-end gap-1'>
                    <Button type='default' onClick={() => setShowModal(false)}>{QUESTION_MODEL.CANCEL_BUTTON}</Button>
                    <Button type='primary' htmlType='submit'>
                        {questionData ? QUESTION_MODEL.UPDATE_BUTTON : QUESTION_MODEL.SAVE_BUTTON}
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default QuestionModel
