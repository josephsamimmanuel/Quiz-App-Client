import React from 'react';
import { Button, Card, Typography, Space, Progress } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { USER_WRITE_EXAM_RESULT } from '../../../utils/constants';
const { Title, Text } = Typography;

const Result = ({ result, setView }) => {
    if (!result) return null;

    const { totalMarks, marksObtained, wrongAnswers, unattempted, verdict } = result;
    const percentage = (marksObtained / totalMarks) * 100;
    console.log(result)

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Card>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Title level={2} style={{ textAlign: 'center' }}>
                        {verdict === USER_WRITE_EXAM_RESULT.VERDICT.PASS ? USER_WRITE_EXAM_RESULT.VERDICT_MESSAGE.SUCCESS : USER_WRITE_EXAM_RESULT.VERDICT_MESSAGE.EXCEPTION}
                    </Title>
                    <div className='progress-container'>
                        <div className='progress-container-item'>
                        <Progress
                            type="circle"
                            percent={percentage}
                            format={percent => `${percent}%`}
                            status={verdict === USER_WRITE_EXAM_RESULT.VERDICT.PASS ? 'success' : 'exception'}
                            size={200}
                            style={{ margin: '0 auto', display: 'block' }}
                        />
                        <Text className='text-lg' strong> {verdict === USER_WRITE_EXAM_RESULT.VERDICT.PASS ? USER_WRITE_EXAM_RESULT.VERDICT_MESSAGE.SUCCESS : USER_WRITE_EXAM_RESULT.VERDICT_MESSAGE.EXCEPTION}</Text>
                        </div>

                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <Card>
                            <Space direction="vertical" size="small">
                                <div className='flex gap-2 justify-between'>
                                <Text className='text-lg border-right' strong>{USER_WRITE_EXAM_RESULT.RESULT.TOTAL_MARKS}: {totalMarks}</Text>
                                <Text className='text-lg' strong>{USER_WRITE_EXAM_RESULT.RESULT.PASS_PERCENTAGE}: 50%</Text>
                                </div>
                                <Text className='text-lg' strong type="success">
                                    <CheckCircleOutlined /> {USER_WRITE_EXAM_RESULT.RESULT.MARKS_OBTAINED}: {marksObtained}
                                </Text>
                                <Text className='text-lg' strong type="danger">
                                    <CloseCircleOutlined /> {USER_WRITE_EXAM_RESULT.RESULT.WRONG_ANSWERS}: {wrongAnswers}
                                </Text>
                                <Text className='text-lg' strong type="warning">
                                    <ExclamationCircleOutlined /> {USER_WRITE_EXAM_RESULT.RESULT.UNATTEMPTED}: {unattempted}
                                </Text>
                            </Space>
                        </Card>

                        <div style={{ textAlign: 'center' }}>
                            <Button type="primary" onClick={() => setView('instruction')}>
                                {USER_WRITE_EXAM_RESULT.BUTTONS.TRY_AGAIN}
                            </Button>
                        </div>
                    </Space>
                    </div>
                </Space>
            </Card>
        </div>
    );
};

export default Result;
