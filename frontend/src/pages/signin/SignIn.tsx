import { Button, Flex, Form, Input, Typography } from 'antd';
import styles from './SignIn.module.scss';
import { Link, useNavigate } from 'react-router';
import { APP_TOKEN_KEY } from '@shared/constants';

export const SignIn = () => {
    const navigate = useNavigate();

    const onFinish = () => {
        navigate('/');
        localStorage.setItem(APP_TOKEN_KEY, 'auth_token');
    };

    return (
        <Flex align='center' className={styles.signIn} vertical>
            <Typography.Title>Sign in</Typography.Title>
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
                <Form.Item
                    label='Password'
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' block>
                        Sign in
                    </Button>
                </Form.Item>
            </Form>
            <Flex gap={20} align='center' vertical>
                <Link to='/forgot-password'>Forgot password</Link>
                <Link to='/register'>Don't have an account?</Link>
            </Flex>
        </Flex>
    );
};
