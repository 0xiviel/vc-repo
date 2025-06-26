import { Button, Flex, Form, Input, Typography } from 'antd';
import styles from './ForgotPassword.module.scss';
import { useNavigate } from 'react-router';

export const ForgotPassword = () => {
    const navigate = useNavigate();

    const onFinish = () => navigate('/reset-password');

    return (
        <Flex align='center' className={styles.passwordRecovery} vertical>
            <Typography.Title className={styles.title}>
                Forgot password
            </Typography.Title>
            <Form layout='vertical' className={styles.form} onFinish={onFinish}>
                <Form.Item
                    label='Email'
                    name='email'
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' block>
                        Forgot password
                    </Button>
                </Form.Item>
            </Form>
        </Flex>
    );
};
