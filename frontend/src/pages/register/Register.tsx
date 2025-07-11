import { Button, Flex, Form, Input, Typography } from 'antd';
import styles from './Register.module.scss';
import { Link } from 'react-router';
import { useUserRegister } from '@entities/user';

type RegisterFormValues = {
    email: string;
    password: string;
    confirmPassword?: string;
    username: string;
};

export const Register = () => {
    const userRegisterMutation = useUserRegister();

    const onFinish = (values: RegisterFormValues) => {
        delete values.confirmPassword;
        userRegisterMutation.mutate(values);
    };

    return (
        <Flex align='center' className={styles.register} vertical>
            <Typography.Title>Register</Typography.Title>
            <Form<RegisterFormValues>
                layout='vertical'
                onFinish={onFinish}
                disabled={userRegisterMutation.isPending}
                className={styles.form}
            >
                <Form.Item<RegisterFormValues>
                    label='Username'
                    name='username'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<RegisterFormValues>
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
                <Form.Item<RegisterFormValues>
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
                <Form.Item<RegisterFormValues>
                    label='Confirm password'
                    dependencies={['password']}
                    name='confirmPassword'
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
