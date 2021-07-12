import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

const Header = () => {

    return (
        <>
            <Navbar bg="dark" variant={'dark'} expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">Shopping</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className={'justify-content-end'}>
                        <Nav
                            className="ml-auto"
                        >
                            <Nav.Link href="#action1"><i className={'fas fa-shopping-cart'}></i>Cart</Nav.Link>
                            <Nav.Link href="#action2"><i className={'fas fa-user'}></i>Sign in</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>

            </Navbar>

        </>
    )
}
export default Header;
