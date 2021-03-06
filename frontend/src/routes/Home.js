import React, {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import Product from "../components/Product";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import {Helmet} from "react-helmet";
import Meta from "../components/Meta";
import {Link} from "react-router-dom";

const Home = ({match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList)

    const {loading, error, products, page, pages} = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber])
    return (
        <>
            <Meta />
            {!keyword ? <ProductCarousel /> : <Link to={'/'} className={'btn btn-dark'}>Go Back</Link>}
            <Container>
                <h1>Latest Products</h1>
                {loading ? (<Loader/>) : error ? (<Message variant={'danger'}>{error}</Message>) : (
                    <>
                        <Row>
                            {products.map((product, index) => (
                                <Col sm={12} md={6} lg={4} xl={3} key={index}>
                                    <Product product={product}/>
                                </Col>
                            ))}
                        </Row>
                        <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''}/>
                    </>

                )}

            </Container>
        </>
    )
}
export default Home;
