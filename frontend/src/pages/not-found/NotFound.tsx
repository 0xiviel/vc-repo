import { Button, Flex, Result } from 'antd';
import { useNavigate } from 'react-router';

export const NotFound = () => {
    const navigate = useNavigate();

    const onBackHome = () => navigate('/');

    return (
        <Flex align='center' justify='center' style={{ height: '100vh' }}>
            <Result
                status='404'
                title='404'
                subTitle='Sorry, the page you visited does not exist.'
                extra={
                    <Button type='primary' onClick={onBackHome}>
                        Back Home
                    </Button>
                }
            />
        </Flex>
    );
};
