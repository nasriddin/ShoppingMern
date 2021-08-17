import React from "react";
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/userAction";

const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <>
            <Navbar bg="dark" variant={'dark'} expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Shopping</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className={'justify-content-end'}>
                        <Nav
                            className="ml-auto"
                        >
                            <LinkContainer to="/cart">
                                <Nav.Link><i className={'fas fa-shopping-cart'}></i>Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id={'username'}>
                                    <LinkContainer to={'/profile'}>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>

                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link><i className={'fas fa-user'}></i>Sign in</Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title={'Admin'} id={'adminmenu'}>
                                    <LinkContainer to={'/admin/users-list'}>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to={'/admin/products-list'}>
                                        <NavDropdown.Item>Products List</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to={'/admin/orders-list'}>
                                        <NavDropdown.Item>Orders List</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}


                        </Nav>
                    </Navbar.Collapse>
                </Container>

            </Navbar>

        </>
    )
}
export default Header;
