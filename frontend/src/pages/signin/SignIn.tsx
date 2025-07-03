import { Button, Flex, Form, Input, Typography } from 'antd';
import styles from './SignIn.module.scss';
import { Link } from 'react-router';
import { useUserSignIn } from '@entities/user';

type SignInFormValues = {
    username: string;
    password: string;
};

export const SignIn = () => {
    const userSignInMutation = useUserSignIn();

    const onFinish = (data: SignInFormValues) => {
        userSignInMutation.mutate(data);
    };

    return (
        <Flex align='center' className={styles.signIn} vertical>
            <Typography.Title>Sign in</Typography.Title>
            <Form<SignInFormValues>
                layout='vertical'
                className={styles.form}
                onFinish={onFinish}
                disabled={userSignInMutation?.isPending}
            >
                <Form.Item<SignInFormValues>
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
