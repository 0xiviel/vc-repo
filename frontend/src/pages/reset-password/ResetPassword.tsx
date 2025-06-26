import { Button, Flex, Form, Input, Typography } from 'antd';
import styles from './ResetPassword.module.scss';
import { useNavigate } from 'react-router';

export const ResetPassword = () => {
    const navigate = useNavigate();

    const onFinish = () => navigate('/signin');

    return (
        <Flex align='center' className={styles.resetPassword} vertical>
            <Typography.Title className={styles.title}>
                Reset password
            </Typography.Title>
            <Form layout='vertical' className={styles.form} onFinish={onFinish}>
                <Form.Item
                    label='New password'
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your New Password',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label='Confirm new password'
                    dependencies={['password']}
                    name='confirm'
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your new password',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue('password') === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        'The new password that you entered do not match'
                                    )
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' block>
                        Reset password
                    </Button>
                </Form.Item>
            </Form>
        </Flex>
    );
};
