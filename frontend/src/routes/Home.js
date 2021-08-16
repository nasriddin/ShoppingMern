import React, {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import Product from "../components/Product";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Home = () => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList)

    const {loading, error, products} = productList

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch])
    return (
        <>
            <Container>
                <h1>Latest Products</h1>
                {loading ? (<Loader />) : error ? (<Message variant={'danger'}>{error}</Message>) : (<Row>
                    {products.map((product, index) => (
                        <Col sm={12} md={6} lg={4} xl={3} key={index}>
                            <Product product={product}/>
                        </Col>
                    ))}
                </Row>)}

            </Container>
        </>
    )
}
export default Home;
