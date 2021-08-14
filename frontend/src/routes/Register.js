import React, {useEffect, useState} from 'react'
import FormContainer from "../components/FormContainer";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../actions/userAction";
import Message from "../components/Message";
import Loader from "../components/Loader";


const Register = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister;

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(e)
        if (password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(register(name, email, password))
        }
    }
    return (
        <>
            <FormContainer>
                <h1>Sign Up</h1>
                {error && <Message variant={'danger'}>{error}</Message>}
                {message && <Message variant={'danger'}>{message}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId={'name'}>
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control
                            type={'text'}
                            placeholder={'Enter Name'}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}>

                        </Form.Control>
                    </Form.Group>
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
                    <Form.Group controlId={'confirmPassword'} className={'mt-2'}>
                        <Form.Label>
                            Confirm Password
                        </Form.Label>
                        <Form.Control
                            type={'password'}
                            placeholder={'Re-enter Password'}
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value)
                            }}>

                        </Form.Control>
                    </Form.Group>
                    <Button type={'submit'} variant={'primary'} className={'mt-2'}>Register</Button>
                </Form>

                <Row className={'py-3'}>
                    <Col>
                        Have an account?{' '}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Register</Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    )
}
export default Register;
