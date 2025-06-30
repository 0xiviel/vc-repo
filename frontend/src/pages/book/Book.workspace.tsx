import {
    Checkbox,
    Col,
    Form,
    Input,
    Row,
    Select,
    type FormInstance,
} from 'antd';

const spaceOptions = [
    { label: 'Workspace 1', value: 'workspace1' },
    { label: 'Workspace 2', value: 'workspace2' },
    { label: 'Workspace 3', value: 'workspace3' },
];

type BookWorkspaceProps = {
    form: FormInstance;
};

export const BookWorkspace = (props: BookWorkspaceProps) => {
    return (
        <Form layout='vertical' form={props.form}>
            <Row gutter={[15, 15]}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name='firstname'
                        label='First name'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your first name',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name='lastname'
                        label='Last name'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your last name',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                name='email'
                label='Email'
                rules={[
                    {
                        required: true,
                        message: 'Please enter your E-mail',
                    },
                    {
                        type: 'email',
                        message: 'Please enter valid E-mail',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='workspace'
                label='Select workspace'
                rules={[
                    {
                        required: true,
                        message: 'Please select workspace',
                    },
                ]}
            >
                <Select options={spaceOptions} />
            </Form.Item>
            <Form.Item valuePropName='checked' name='withLaptop'>
                <Checkbox>With a laptop</Checkbox>
            </Form.Item>
        </Form>
    );
};
