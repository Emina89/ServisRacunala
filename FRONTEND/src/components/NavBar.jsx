import React from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { RoutesNames } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand
                        className='kursor'
                        onClick={() => navigate(RoutesNames.HOME)}
                    >
                        Servis Računala
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="https://eminav-001-site1.itempurl.com/swagger/index.html" target='_blank'>
                                API
                            </Nav.Link>

                            <NavDropdown title="Klijenti" id="collapsible-nav-dropdown">
                                <NavDropdown.Item onClick={() => navigate(RoutesNames.KLIJENT_PREGLED)}>
                                    Klijenti
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate(RoutesNames.SERVISNI_NALOZI_PREGLED)}>
                                    Servisni Nalozi
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate(RoutesNames.PRIMKA_SERVISA)}>
                                    Primka Servisa
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4">
                                    Aktivnost Servis
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
