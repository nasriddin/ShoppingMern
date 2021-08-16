import React, {useState} from "react";
import FormContainer from "../components/FormContainer";
import {Button, Col, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {savePaymentMethod} from "../actions/cartAction";
import CheckoutSteps from "../components/CheckoutSteps";


const Payment = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch()

    if (!shippingAddress){
        return history.push('/shipping')

    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(e)

        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as={'legend'}>
                        Select Method
                    </Form.Label>
                    <Col>
                        <Form.Check
                            type={'radio'}
                            label={'PayPal or Credit Card'}
                            id={'PayPal'}
                            name={'paymentMethod'}
                            value={'PayPal'}
                            checked
                            onChange={(e)=>setPaymentMethod(e.target.value)}
                        />
                        {/*<Form.Check*/}
                        {/*    type={'radio'}*/}
                        {/*    label={'Stripe'}*/}
                        {/*    id={'Stripe'}*/}
                        {/*    name={'paymentMethod'}*/}
                        {/*    value={'Stripe'}*/}
                        {/*    onChange={(e)=>setPaymentMethod(e.target.value)}*/}
                        {/*/>*/}
                    </Col>
                </Form.Group>

                <Button type={"submit"} variant={'primary'}>Continue...</Button>
            </Form>

        </FormContainer>
    )
}
export default Payment;
