import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const {data} = await axios.get('api/products')

            setProducts(data)
        }
        fetchProducts();
    }, [])
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
