import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Form, message } from 'antd';
import Button from '../../components/Button';

const Register = () => {
    const navigate = useNavigate();

    // const onFinish = async (values) => {
    //   try {
    //     const response = await RegisterUser(values);
    //     if (response.success) {
    //       message.success(response.message);
    //       console.log(response.message);
    //     } else {
    //       message.error(response.message);
    //       console.error(response.message);
    //     }
    //   } catch (error) {
    //     message.error(error);
    //   }
    // };

    // useEffect(() => {
    //   if (localStorage.getItem('token')) {
    //     navigate('/');
    //   }
    // }, []);

    return (
        <div className="flex justify-center h-screen items-center bg-primary">
            <div className="card p - 3 w - 400">
                <h1 className="text - xl mb - 1">Welcome to VK Shows! Please Register</h1>
                <hr />
                <Form layout="vertical" className="mt - 1" onFinish={() => { }}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter your name!' }]}
                    >
                        <input type="text" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please enter your email!' }]}
                    >
                        <input type="email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <input type="password" />
                    </Form.Item>

                    <div className="flex flex - col mt - 2 gap - 1">
                        <Button fullWidth title="REGISTER" type="submit" />
                        <Link to="/login" className="text-primary">
                            {' '}
                            Already have an account? Login
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Register