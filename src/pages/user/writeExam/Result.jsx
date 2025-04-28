import React from 'react';
import { Button, Card, Typography, Space, Progress } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

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
                        {verdict === 'Pass' ? 'Congratulations! 🎉' : 'Better Luck Next Time! 😊'}
                    </Title>
                    <div className='progress-container'>
                        <div className='progress-container-item'>
                        <Progress
                            type="circle"
                            percent={percentage}
                            format={percent => `${percent}%`}
                            status={verdict === 'Pass' ? 'success' : 'exception'}
                            size={200}
                            style={{ margin: '0 auto', display: 'block' }}
                        />
                        <Text className='text-lg' strong> {verdict}</Text>
                        </div>

                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <Card>
                            <Space direction="vertical" size="small">
                                <div className='flex gap-2 justify-between'>
                                <Text className='text-lg border-right' strong>Total Marks: {totalMarks}</Text>
                                <Text className='text-lg' strong> Pass Percentage: 50%</Text>
                                </div>
                                <Text className='text-lg' strong type="success">
                                    <CheckCircleOutlined /> Marks Obtained: {marksObtained}
                                </Text>
                                <Text className='text-lg' strong type="danger">
                                    <CloseCircleOutlined /> Wrong Answers: {wrongAnswers}
                                </Text>
                                <Text className='text-lg' strong type="warning">
                                    <ExclamationCircleOutlined /> Unattempted: {unattempted}
                                </Text>
                            </Space>
                        </Card>

                        <div style={{ textAlign: 'center' }}>
                            <Button type="primary" onClick={() => setView('instruction')}>
                                Try Again
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
