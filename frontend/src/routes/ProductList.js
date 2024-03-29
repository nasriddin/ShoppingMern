import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from 'react-router-bootstrap'
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Button, Col, Row, Table} from "react-bootstrap";
import {createProduct, deleteProduct, listProducts} from "../actions/productActions";
import { PRODUCT_CREATE_RESET} from "../constants/productConstants";
import Paginate from "../components/Paginate";

const ProductList = ({history, match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, error:errorDelete, success:successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {loading: loadingCreate, error:errorCreate, success:successCreate, product: createdProduct} = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})
        if (!userInfo.isAdmin){
            history.push('/login')
        }
        if (successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }
        else{
            dispatch(listProducts('', pageNumber))
        }
    }, [dispatch, userInfo, history, successDelete, successCreate, createdProduct, pageNumber]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure to delete?')){
            dispatch(deleteProduct(id))
        }
    }
    const createProductHandler = () =>{
        dispatch(createProduct())
    }

    return (
        <>
            <Row className={'align-items-center'}>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className={'text-right'}>
                    <Button className={'my-3'} onClick={createProductHandler}>
                        <i className={'fas fa-plus'} /> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant={'danger'}>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant={'danger'}>{errorCreate}</Message>}
            {loading ? <Loader/> : error ? (<Message variant={'danger'}>{error}</Message>) : (
                <>
                    <Table striped bordered hover responsive className={'table-sm'}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>
                                    {product.category}
                                </td>
                                <td>
                                    {product.brand}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant={'dark'} className={'btn-sm'}>
                                            <i className={'fas fa-edit'}/>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant={'danger'} className={'btn-sm'} onClick={() => {
                                        deleteHandler(product._id)
                                    }}>
                                        <i className={'fas fa-trash'}/>
                                    </Button>
                                </td>
                            </tr>
                        ))

                        }
                        </tbody>
                    </Table>
                    <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''} isAdmin={true}/>



                </>


            )}

        </>
    )
}
export default ProductList
