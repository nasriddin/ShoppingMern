import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap"
import Message from "../components/Message";
import Loader from "../components/Loader";
import {getUserDetails, updateUserProfile} from "../actions/userAction";
import {listMyOrders} from "../actions/orderActions";
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";


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
    const orderListMy = useSelector(state => state.orderListMy)
    const {loading:loadingOrders, error:errorOrders, orders} = orderListMy;

    // const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (!userInfo){
            history.push('/login')
        }else{
            if (!user.name || success){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
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
                    {loadingOrders ? <Loader /> : errorOrders ? <Message variant={'danger'}>{errorOrders}</Message> :
                        (
                            <Table striped bordered hover responsive className={'table-sm'}>
                                <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>DATE</td>
                                    <td>TOTAL</td>
                                    <td>PAID</td>
                                    <td>DELIVERED</td>
                                    <td></td>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.total}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                            <i className={'fas fa-times'} style={{color: 'red'}}></i>
                                        )}</td>
                                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                            <i className={'fas fa-times'} style={{color: 'red'}}></i>
                                        )}</td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant={'dark'} className={'btn-sm'}>Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}

                                </tbody>
                            </Table>

                        )
                    }

                </Col>
            </Row>
        </>
    )
}
export default Profile;
