import React from 'react'
import { Form, message, Modal } from "antd"
import { useDispatch, UseDispatch, useSelector } from 'react-redux'

import { AddTheatre, UpdateTheatre } from "../../apicalls/theatres"
import Button from "../../components/Button.js";
import { HideLoading, ShowLoading } from '../../redux/loaderSlice.js';

function TheatreForm({
    setShowTheatreFormModal,
    formType,
    selectedTheatre,
    setSelectedTheatre,
    getData
}) {

    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        values.owner = user._id;
        try {
            dispatch(ShowLoading());
            let response = null;
            if (formType === "add") {
                response = await AddTheatre(values);
            }
            else {
                values.theatreId = selectedTheatre._id;
                response = await UpdateTheatre(values);
            }


            if (response.success) {
                message.success(response.message);
                setShowTheatreFormModal(false);
                setSelectedTheatre(null);
                getData();
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    return (
        <Modal
            title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
            open={true}
            onCancel={() => {
                setShowTheatreFormModal(false);
                setSelectedTheatre(null);
            }}
            footer={null}>
            <Form layout='vertical' onFinish={onFinish} initialValues={selectedTheatre}>
                <Form.Item label="Name" name="name"
                    rules={[{ required: true, message: "Please enter theatre, name!" }]} >
                    <input type='text' />
                </Form.Item>

                <Form.Item label="Address" name="address"
                    rules={[{ required: true, message: "Please enter theatre address" }]}>
                    <textarea type="text" />
                </Form.Item>

                <Form.Item label="Phone Number" name="phone"
                    rules={[{ required: true, message: "Please enter theatre phone number" }]}>
                    <input type='text' />
                </Form.Item>

                <Form.Item label="Email" name="email"
                    rules={[{ required: true, message: "Please enter theatre email id!" }]}>
                    <input type='email' />
                </Form.Item>

                <div className='flex gap-1 justify-end'>
                    <Button title="Cancel" variant="outlined" type="button"
                        onClick={() => {
                            setShowTheatreFormModal(false)
                            setSelectedTheatre(null)
                        }} />
                    <Button title="Save" type="Submit" />
                </div>
            </Form>
        </Modal>
    )
}

export default TheatreForm
