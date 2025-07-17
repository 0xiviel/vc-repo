import type { Equipment } from '@entities/equipment';
import { App, Form, Input, Modal } from 'antd';

type AddEquipmentProps = {
    show: boolean;
    onClose: () => void;
};

type AddEquipmentFormValues = Pick<Equipment, 'name' | 'description'>;

export const AddEquipment = (props: AddEquipmentProps) => {
    const [form] = Form.useForm<AddEquipmentFormValues>();
    const { notification } = App.useApp();

    const validateForm = async () => {
        try {
            await form.validateFields();
        } catch (error) {
            console.error(error);
            return false;
        }

        return true;
    };

    const onClose = () => {
        form.resetFields();
        props.onClose();
    };

    const onFinish = async () => {
        const isValid = await validateForm();

        if (!isValid) {
            return;
        }

        notification.success({
            message: 'Success',
            description: 'New equipment has been successfully added',
        });

        onClose();
    };

    return (
        <Modal
            title='Add Equipment'
            okText='Add'
            open={props.show}
            onCancel={onClose}
            onOk={onFinish}
            destroyOnHidden={true}
            closable
        >
            <Form<AddEquipmentFormValues> form={form} layout='vertical'>
                <Form.Item<AddEquipmentFormValues>
                    label='Name'
                    name='name'
                    rules={[
                        {
                            required: true,
                            message: 'Please provide a name of the equipment',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<AddEquipmentFormValues>
                    label='Description'
                    name='description'
                    rules={[
                        {
                            required: true,
                            message:
                                'Please provide a description of the equipment',
                        },
                    ]}
                >
                    <Input.TextArea rows={6} autoSize />
                </Form.Item>
            </Form>
        </Modal>
    );
};
