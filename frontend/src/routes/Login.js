import React, {useEffect, useState} from 'react'
import FormContainer from "../components/FormContainer";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../actions/userAction";
import Message from "../components/Message";
import Loader from "../components/Loader";


const Login = ({location, history}) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo){
            history.push('redirect')
        }
    }, [history, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(e)
        dispatch(login(email, password))
    }
    return (
        <>
            <FormContainer>
                <h1>Sign In</h1>
                {error && <Message variant={'danger'}>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId={'email'}>
                        <Form.Label>
                            Email Address
                        </Form.Label>
                        <Form.Control
                            type={'text'}
                            placeholder={'Email Address'}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId={'password'} className={'mt-2'}>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control
                            type={'password'}
                            placeholder={'Password'}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}>

                        </Form.Control>
                    </Form.Group>
                    <Button type={'submit'} variant={'primary'} className={'mt-2'}>Sign in</Button>
                </Form>

                <Row className={'py-3'}>
                    <Col>
                        New Customer?{' '}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                    </Col>
                </Row>
            </FormContainer>


        </>
    )
}
export default Login;
