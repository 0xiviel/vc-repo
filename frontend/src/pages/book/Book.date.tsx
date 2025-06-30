import { DatePicker, Form, TimePicker, type FormInstance } from 'antd';
import dayjs from 'dayjs';
import type { ComponentProps } from 'react';

type BookDateProps = {
    form: FormInstance;
};

export const BookDate = (props: BookDateProps) => {
    const startTime = Form.useWatch('startTime', props.form);

    console.log(startTime);

    const disabledTime = () => {
        const startHours = dayjs(startTime).get('hours');
        const startMinutes = dayjs(startTime).get('minutes');
        const startSeconds = dayjs(startTime).get('seconds');

        return {
            disabledHours: () =>
                Array.from({ length: 24 }, (_, i) => i).filter(
                    (hour) => hour < startHours
                ),
            disabledMinutes: () =>
                Array.from({ length: 24 }, (_, i) => i).filter(
                    (minute) => minute < startMinutes
                ),
            disabledSeconds: () =>
                Array.from({ length: 24 }, (_, i) => i).filter(
                    (second) => second < startSeconds
                ),
        };
    };

    const onFieldsChange: ComponentProps<typeof Form>['onFieldsChange'] = (
        changedFields
    ) => {
        const isStartChanged = changedFields.some(
            (field) => field.name[0] === 'startTime'
        );

        if (!isStartChanged) {
            return;
        }

        props.form.resetFields(['endTime']);
    };

    return (
        <Form
            layout='vertical'
            form={props.form}
            style={{ maxWidth: '400px', width: '100%' }}
            onFieldsChange={onFieldsChange}
        >
            <Form.Item
                name='data'
                label='Date'
                rules={[{ required: true, message: 'Please select date' }]}
            >
                <DatePicker mode='date' style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                name='startTime'
                label='Start time'
                rules={[
                    { required: true, message: 'Please select start time' },
                ]}
            >
                <TimePicker style={{ width: '100%' }} needConfirm={false} />
            </Form.Item>
            <Form.Item
                name='endTime'
                label='End time'
                rules={[{ required: true, message: 'Please select end time' }]}
            >
                <TimePicker
                    style={{ width: '100%' }}
                    needConfirm={false}
                    disabledTime={disabledTime}
                />
            </Form.Item>
        </Form>
    );
};
