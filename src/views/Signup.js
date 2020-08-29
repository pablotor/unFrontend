import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import app from "../firebaseConfig";
import { withRouter } from "react-router";
import { selectUser,
         selectError,
         selectSignup,
         signupRequest,
         signupSwitch
       } from '../features/firebaseAuth/firebaseAuthSlice'

import Errores from "../components/Errores";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Signup = ({ setsignup, history }) => {

    const error = useSelector(selectError);
    const dispatch = useDispatch();
    const signup = e => dispatch(signupRequest(e));

    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={signup}
      >
        <Form.Item>
            <h1>Sign Up</h1>
        </Form.Item>
        {error? <Form.Item><Errores mensaje={error}/></Form.Item>:null}
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            prefix={
                <UserOutlined
                    style={{
                        color: "rgba(0,0,0,.25)"
                    }}
                />
            }
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            prefix={
                <LockOutlined
                    style={{
                        color: "rgba(0,0,0,.25)"
                    }}
                />
            }
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>

                Or{" "}
                <Button
                    onClick={() => dispatch(signupSwitch())}
                    type="link"
                >
                    Sign in!
                </Button>
            </Form.Item>
        </Form>
    );
};

export default withRouter(Signup);
