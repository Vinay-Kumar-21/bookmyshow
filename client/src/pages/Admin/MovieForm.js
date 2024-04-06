import React from 'react'
import { Col, Form, message, Modal, Row } from 'antd'
import { useDispatch, UseDispatch } from 'react-redux'
import moment, { updateLocale } from 'moment'

import { HideLoading, ShowLoading } from '../../redux/loaderSlice'
import Button from '../../components/Button'
//import { AddMovie, UpdateMovie } from '../../apicalls/movies'


function MovieForm({
    onClose,
    selectedMovie,
    setSelectedMovie,
    getData,
    formType,
}) {

    if (selectedMovie) {
        selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format("YYYY-MM-DD");
    }

    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            let response = null;

            // if (formType === "add") {
            //     response = await AddMovie(values);
            // }
            // else {
            //     response = await UpdateMovie({
            //         ...values,
            //         movieId: selectedMovie._id
            //     })
            // }

            if (response.success) {
                getData();
                message.success(response.message);
                onClose();
                setSelectedMovie(null);
            }
            else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        }
        catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }
    return (
        <Modal
            title={formType === "add" ? "ADD MOVIE" : "EDIT MOVIE"}
            open={true}
            onCancel={() => {
                onClose();
                setSelectedMovie(null);
            }}
            footer={null}
            width={800}
        >
            <Form layout='vertical' initialValues={selectedMovie} onFinish={onFinish}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Movie Description" name="description">
                            <textarea type="text" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Movie Duration (Min)" name="duration">
                            <input type='text'></input>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Language" name="language">
                            <select name='' id=''>
                                <option value=''>Select Language</option>
                                <option value='Telugu'>Telugu</option>
                                <option value='Hindi'>Hindi</option>
                                <option value='Tamil'>Tamil</option>
                                <option value='English'>English</option>
                            </select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Movie Relase Date" name="releaseDate">
                            <input type='date' />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Genre" name="genre">
                            <select name='' id=''>
                                <option value="">Select Genre</option>
                                <option value="Action">Action</option>
                                <option value="Horror">Horror</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Romance">Romance</option>
                            </select>
                        </Form.Item>
                    </Col>

                    <Col span={16}>
                        <Form.Item label="Poster URL" name="poster">
                            <input type='text' />
                        </Form.Item>
                    </Col>
                </Row>


                <div className='flex justify-end gap-1'>
                    <Button
                        title="Cancel"
                        variant="outlined"
                        type="button"
                        onClick={() => {
                            onClose();
                            setSelectedMovie(null);
                        }}></Button>
                    <Button title="Save" type="sumbit" />
                </div>
            </Form>
        </Modal>
    )
}

export default MovieForm
