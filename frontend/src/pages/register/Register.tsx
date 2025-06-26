import { Button, Col, Flex, Form, Input, Row, Typography } from 'antd';
import styles from './Register.module.scss';
import { Link, useNavigate } from 'react-router';

export const Register = () => {
    const navigate = useNavigate();

    const onFinish = () => {
        navigate('/signin');
    };

    return (
        <Flex align='center' className={styles.register} vertical>
            <Typography.Title>Register</Typography.Title>
            <Form layout='vertical' onFinish={onFinish}>
                <Row gutter={[15, 15]}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label='First name'
                            name='firstname'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your first name',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label='Last name'
                            name='lastname'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your last name',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
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
                <Form.Item
                    label='Confirm password'
                    dependencies={['password']}
                    name='confirm'
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password',
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
                        Register
                    </Button>
                </Form.Item>
            </Form>
            <Flex gap={6} justify='center' align='center'>
                <Typography.Text>Already have an account?</Typography.Text>
                <Link to='/signin'>Sign in</Link>
            </Flex>
        </Flex>
    );
};
