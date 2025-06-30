import { Flex, Spin } from 'antd';

export const FullScreenLoader = () => {
    return (
        <Flex
            align='center'
            justify='center'
            style={{
                width: '100%',
                height: '100vh',
            }}
        >
            <Spin />
        </Flex>
    );
};
