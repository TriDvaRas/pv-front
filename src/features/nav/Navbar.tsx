/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

const Bar = () => {
    return (
        <Navbar bg="dark-700" variant="dark" expand="lg" className=''>
            <Container>
                <Nav className="fix-font-weight">
                    <Nav.Link as={NavLink} to='/players'><h5 className='mb-0 fs-4'>Players</h5></Nav.Link>
                    <Nav.Link as={NavLink} to='/teams'><h5 className='mb-0 fs-4'>Teams</h5></Nav.Link>
                    <Nav.Link as={NavLink} to='/bracket'><h5 className='mb-0 fs-4'>Bracket</h5></Nav.Link>
                </Nav>
                <Nav className="fix-font-weight">
                    <Nav.Link as={NavLink} to='/reset'><h5 className='mb-0 fs-5'>Reset</h5></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};
export default Bar;