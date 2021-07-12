import React from "react";
import products from "../products";
import {Col, Container, Row} from "react-bootstrap";
import Product from "../components/Product";

const Home = () => {
    return(
        <>
            <Container>
                <h1>Latest Products</h1>
                <Row>
                    {products.map((product, index) => (
                        <Col sm={12} md={6} lg={4} xl={3} key={index}>
                            <Product product={product}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}
export default Home;
