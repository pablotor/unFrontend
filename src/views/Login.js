import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from "antd";
import { Form, Input, Button } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Signup from "./Signup";
import { withRouter } from "react-router";
import * as firebase from "firebase/app";
import { selectUser,
         selectSignup,
         selectError,
         selectLogged,
         loginRequest,
         signupSwitch
       } from '../features/firebaseAuth/firebaseAuthSlice'
import Errores from '../components/Errores'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = ({ history }) => {

    const { Content, Footer } = Layout;

    const user = useSelector(selectUser);
    const signup = useSelector(selectSignup);
    const error = useSelector(selectError);
    const logged = useSelector(selectLogged);
    const dispatch = useDispatch();
    //const signin = e => console.log(e);
    const signin = e => dispatch(loginRequest(e));

    useEffect(() => {
        if (logged) {
            history.push("/");
        }
    }, [history, user]);

    return (
        <Layout style={{ height: "100vh" }}>
            <Content
                style={{
                    padding: "0 50px",
                    marginTop: 40,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh"
                }}
            >
                <div
                  style={{
                      background: "#fff",
                      padding: 24,
                      height: 450,
                      width: 400,
                      textAlign: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                      display: "flex"
                  }}
                >
                    {!signup ? (
                      <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={signin}
                      >
                        <Form.Item>
                            <h1>Sign In</h1>
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
                            Sign In
                          </Button>

                                Or {" "}
                                <Button
                                    onClick={() => dispatch(signupSwitch())}
                                    type="link"
                                >
                                    Sign Up!
                                </Button>
                            </Form.Item>
                        </Form>
                    ) : (
                        <Signup />
                    )}
                </div>
            </Content>
        </Layout>
    );
};
export default withRouter(Login);
