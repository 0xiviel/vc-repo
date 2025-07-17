import { Button, Flex, Form, Result, Steps, Typography } from 'antd';
import styles from './Book.module.scss';
import { BookWorkspace } from './Book.workspace';
import { useState } from 'react';
import { BookDate } from './Book.date';
import { useNavigate } from 'react-router';

export const Book = () => {
    const [spaceForm] = Form.useForm();
    const [dateForm] = Form.useForm();
    const navigate = useNavigate();

    const [step, setStep] = useState(0);
    const [isBookingSuccess, setIsBookingSuccess] = useState(false);
    const steps = [
        {
            title: 'Workspace selection',
            content: <BookWorkspace form={spaceForm} />,
            form: spaceForm,
        },
        {
            title: 'Date selection',
            content: <BookDate form={dateForm} />,
            form: dateForm,
        },
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const validateForm = async () => {
        const form = steps[step].form;

        try {
            await form.validateFields();
        } catch (error) {
            console.error(error);
            return false;
        }

        return true;
    };

    const next = async () => {
        if (!(await validateForm())) {
            return;
        }

        setStep(step + 1);
    };

    const prev = () => {
        setStep(step - 1);
    };

    const onFinish = async () => {
        if (!(await validateForm())) {
            return;
        }

        setIsBookingSuccess(true);
    };

    return (
        <Flex className={styles.book}>
            <Flex
                className={`container `}
                align='center'
                justify='center'
                vertical
            >
                {isBookingSuccess ? (
                    <Result
                        status='success'
                        title='Successfully booked a workspace!'
                        extra={[
                            <Button
                                type='primary'
                                onClick={() => navigate('/')}
                                key='mainPageButton'
                            >
                                Go to the Main page
                            </Button>,
                        ]}
                    />
                ) : (
                    <>
                        <Typography.Title>
                            Workspace booking form
                        </Typography.Title>
                        <Flex justify='space-between' align='center'>
                            <Steps
                                current={step}
                                items={items}
                                style={{ height: '60%' }}
                                direction='vertical'
                            />
                            <Flex style={{ width: '100%' }} vertical>
                                {steps[step].content}
                                <Flex>
                                    {step < steps.length - 1 && (
                                        <Button
                                            type='primary'
                                            onClick={() => next()}
                                        >
                                            Next
                                        </Button>
                                    )}
                                    {step === steps.length - 1 && (
                                        <Button
                                            type='primary'
                                            onClick={onFinish}
                                        >
                                            Done
                                        </Button>
                                    )}
                                    {step > 0 && (
                                        <Button
                                            style={{ margin: '0 8px' }}
                                            onClick={() => prev()}
                                        >
                                            Previous
                                        </Button>
                                    )}
                                </Flex>
                            </Flex>
                        </Flex>
                    </>
                )}
            </Flex>
        </Flex>
    );
};
