import { Button, Radio } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Question({ exam, setView, selectedQuestion, setSelectedQuestion, selectedAnswers, setSelectedAnswers, calculateResult }) {
    const { t } = useTranslation();
    // Get current question
    const currentQuestion = exam?.questions?.[selectedQuestion];

    const handleOptionSelect = (e) => {
        const optionIndex = currentQuestion.options.findIndex(opt => opt === e.target.value);
        const answerKey = `Option ${optionIndex + 1}`;
        console.log('optionIndex', answerKey);

        // Store the answer while preserving previous answers
        setSelectedAnswers(prevAnswers => ({
            ...prevAnswers,
            [currentQuestion._id]: {
                answer: e.target.value,
                optionNumber: answerKey
            }
        }));
        return answerKey;
    };

    const handlePrevious = () => {
        if (selectedQuestion > 0) {
            setSelectedQuestion(selectedQuestion - 1);
        }
    };

    const handleNext = () => {
        if (selectedQuestion < (exam?.questions?.length - 1)) {
            setSelectedQuestion(selectedQuestion + 1);
        }
    };

    if (!currentQuestion) return null;

    return (
        <div className='question-container'>
            <div className='question-container'>
                <h1>{selectedQuestion + 1}. {currentQuestion.question}</h1>
                <Radio.Group
                    className='flex flex-col gap-2 p-2'
                    value={selectedAnswers[currentQuestion._id]?.answer}
                    onChange={handleOptionSelect}
                >
                    {currentQuestion.options.map((option, index) => (
                        <Radio
                            className='text-lg'
                            key={index}
                            value={option}
                        >
                            {option}
                        </Radio>
                    ))}
                </Radio.Group>
                <div className='flex gap-2 justify-between'>
                    <Button
                        type="primary"
                        onClick={handlePrevious}
                        disabled={selectedQuestion === 0}
                    >
                        {t('QUESTION.BUTTONS.PREVIOUS')}
                    </Button>
                    {selectedQuestion !== exam.questions.length - 1 && (
                        <Button
                            type="primary"
                            onClick={handleNext}
                            disabled={selectedQuestion === exam.questions.length - 1}
                        >
                            {t('QUESTION.BUTTONS.NEXT')}
                        </Button>
                    )}
                    {selectedQuestion === exam.questions.length - 1 && (
                        <Button
                            type="primary"
                            onClick={() => {
                                calculateResult();
                                setSelectedAnswers({})
                                setSelectedQuestion(0)
                                setView('result')
                            }}
                        >
                            {t('QUESTION.BUTTONS.SUBMIT')}
                        </Button>
                    )}
                </div>
            </div>

            {/* Question Progress */}
            <div className="mt-4">
                {t('QUESTION.PROGRESS').replace('{selectedQuestion + 1}', selectedQuestion + 1).replace('{exam?.questions?.length}', exam?.questions?.length)}
            </div>
        </div>
    )
}

export default Question
