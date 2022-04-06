import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Card, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { api_base_url } from '../../backendbaseurl';

export default function Login() {
    const history = useHistory()
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    function Cancel() {
        history.push('/')
    }
    const submitHandler = (e) => {

        const data = { user_name: username, user_password: password }
        axios.post(api_base_url + "/auths/signin", data).then((res) => {
            message.success("Logged In Successfully");
            console.log('gulshan', res.data)
            const d = res.data
            dispatch({ type: 'LOGIN', payload: d })
            history.push('/')
            window.location.reload(false)
            // localStorage.setItem("token", res.data.token);
        }).catch(err => {message.error('something went wrong')})
    }
    return (
        <div>
            <Card title="Login" style={{ width: 500, marginLeft: '33%', marginTop: '10%', backgroundColor: '#E8E8E8' }}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={(e) => { submitHandler(e) }}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <div className='d-flex'>
                            <Button type="primary" style={{ marginLeft: '30px', borderRadius: '5px' }} htmlType="submit">
                                Submit
                            </Button>
                            <Button onClick={Cancel} type="danger" style={{ marginLeft: '30px', borderRadius: '5px' }} htmlType="submit">
                                Cancel
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
