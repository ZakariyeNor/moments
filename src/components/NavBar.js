import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import logo from '../assets/logo.png'
import stylesa from '../styles/NavBar.module.css'
import {NavLink} from "react-router-dom"

const NavBar = () => {
    return (
        <Navbar className={stylesa.NavBar} expand="md" fixed='top'>
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>
                        <img src={logo} alt='logo' height="45" />
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <NavLink
                            exact
                            className={stylesa.NavLink} activeClassName={stylesa.Active}
                            to="/"><i className="fa-solid fa-house"></i> 
                            Home
                        </NavLink>
                        <NavLink
                            className={stylesa.NavLink} activeClassName={stylesa.Active}
                            to="/signin"><i className="fa-solid fa-right-to-bracket">
                                </i> Sign in
                        </NavLink>
                        <NavLink
                            className={stylesa.NavLink} activeClassName={stylesa.Active}
                            to="/signup"><i className="fa-solid fa-user-plus">
                                </i> Sign up
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar