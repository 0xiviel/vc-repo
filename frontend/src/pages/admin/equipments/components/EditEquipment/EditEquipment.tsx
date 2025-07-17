import type { Equipment } from '@entities/equipment';
import { App, Form, Input, Modal } from 'antd';

type EditEquipmentProps = {
    show: boolean;
    onClose: () => void;
};

type EditEquipmentFormValues = Pick<Equipment, 'name' | 'description'>;

export const EditEquipment = (props: EditEquipmentProps) => {
    const [form] = Form.useForm<EditEquipmentFormValues>();
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
            description: 'Equipment has been successfully updated',
        });

        onClose();
    };

    return (
        <Modal
            title='Edit Equipment'
            okText='Save'
            open={props.show}
            onCancel={onClose}
            onOk={onFinish}
            destroyOnHidden={true}
            closable
        >
            <Form<EditEquipmentFormValues> form={form} layout='vertical'>
                <Form.Item<EditEquipmentFormValues>
                    label='Name'
                    name='name'
                    rules={[
                        {
                            required: true,
                            message: 'Please provide a name for an equipment',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<EditEquipmentFormValues>
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
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    );
};
