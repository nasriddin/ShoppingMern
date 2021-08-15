import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {getUserDetails, updateUserProfile} from "../actions/userAction";


const Profile = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails;
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin;
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile;

    // const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (!userInfo){
            history.push('/login')
        }else{
            if (!user.name){
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, dispatch, user]);

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(e)
        if (password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
    }
    return (
        <>
            <Row>
                <Col sm={12} md={3}>
                    <h2>Sign Up</h2>
                    {error && <Message variant={'danger'}>{error}</Message>}
                    {message && <Message variant={'danger'}>{message}</Message>}
                    {success && <Message variant={'success'}>Profile Updated</Message>}
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
                        <Button type={'submit'} variant={'primary'} className={'mt-2'}>Update Profile</Button>
                    </Form>
                </Col>
                <Col sm={12} md={9}>
                    <h2>My Orders</h2>
                </Col>
            </Row>
        </>
    )
}
export default Profile;
