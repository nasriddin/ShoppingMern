import React, {useEffect, useState} from 'react'
import FormContainer from "../components/FormContainer";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserDetails,  updateUser} from "../actions/userAction";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {USER_UPDATE_RESET} from "../constants/userConstants";


const UserEdit = ({match, history}) => {
    const userId = match.params.id
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails;

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate;


    useEffect(() => {
        if (successUpdate) {
            dispatch({type: USER_UPDATE_RESET})
            history.push('/admin/users-list')
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [user, dispatch, successUpdate, history, userId]);

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(e)

        dispatch(updateUser({
            _id: userId,
            name,
            email,
            isAdmin
        }))

    }
    return (
        <>

            <Link to={'/admin/users-list'} className={'btn btn-light my-3'}>Go back</Link>
            <FormContainer>
                <h1>Edit user</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant={'danger'}>{errorUpdate}</Message>}
                {loading ? <Loader/> : error ? <Message variant={'danger'}>{error}</Message> : (
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
                        <Form.Group controlId={'isAdmin'}>
                            <Form.Check
                                type={'checkbox'}
                                label={'Is Admin'}
                                checked={isAdmin}
                                onChange={(e) => {
                                    setIsAdmin(e.target.checked)
                                }}>
                            </Form.Check>
                        </Form.Group>

                        <Button type={'submit'} variant={'primary'} className={'mt-2'}>Update</Button>
                    </Form>

                )}


            </FormContainer>

        </>
    )
}
export default UserEdit;
