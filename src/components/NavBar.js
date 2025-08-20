import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import logo from '../assets/logo.png'
import stylesa from '../styles/NavBar.module.css'
import {NavLink} from "react-router-dom"
import { useCurrentUser, useSetCurrentUser } from '../context/CurrentUserContext'
import Avatar from './Avatar'
import axios from 'axios'

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const handleSignOut = async () => {
        try {
            await axios.post('dj-rest-auth/logout/')
            setCurrentUser(null);
        } catch (err) {
            console.log(err)
        }
    }

    const addPostIcon = (
        <NavLink
            className={stylesa.NavLink} activeClassName={stylesa.Active}
            to="/post/create"><i class="fa-solid fa-plus">
            </i> Add-post
        </NavLink>
    )
    const loggedInIcons = (
        <>
            <NavLink
                className={stylesa.NavLink} activeClassName={stylesa.Active}
                to="/feed"><i class="fa-solid fa-bars-staggered">
                </i> Feed
            </NavLink>
            <NavLink
                className={stylesa.NavLink} activeClassName={stylesa.Active}
                to="/liked"><i class="fa-regular fa-heart">
                </i> Liked
            </NavLink>
            <NavLink
                className={stylesa.NavLink}
                to="/" onClick={handleSignOut} ><i class="fa-solid fa-arrow-right-from-bracket">
                    </i> Sign out
            </NavLink>
            <NavLink
                className={stylesa.NavLink}
                to={`/profiles/${currentUser?.profile_id}`}
                onClick={() => {}}>
                    <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
            </NavLink>
        </>
    )
    const loggedOutIcons = (
        <>
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
        </>
    )
    return (
        <Navbar className={stylesa.NavBar} expand="md" fixed='top'>
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>
                        <img src={logo} alt='logo' height="45" />
                    </Navbar.Brand>
                </NavLink>
                {currentUser && addPostIcon }
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <NavLink
                            exact
                            className={stylesa.NavLink} activeClassName={stylesa.Active}
                            to="/"><i className="fa-solid fa-house"></i> 
                            Home
                        </NavLink>
                        { currentUser ? loggedInIcons : loggedOutIcons }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar