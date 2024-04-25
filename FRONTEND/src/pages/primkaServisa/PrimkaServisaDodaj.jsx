import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import PrimkaServisaService from '../../service/PrimkaServisaService';

export default function PrimkaServisaDodaj() {
    const navigate = useNavigate();
    const [primkaServisa, setPrimkaServisa] = useState({
        vrsta: '',
        model: '',
        servisniNalogId: ''
    });

    const handleChange = (e) => {
        setPrimkaServisa({ ...primkaServisa, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await PrimkaServisaService.post(primkaServisa);
        navigate(RoutesNames.PRIMKA_SERVISA);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="vrsta">
                    <Form.Label>Vrsta</Form.Label>
                    <Form.Control type="text" name="vrsta" value={primkaServisa.vrsta} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="model">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" name="model" value={primkaServisa.model} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="servisniNalogId">
                    <Form.Label>Servisni Nalog ID</Form.Label>
                    <Form.Control type="text" name="servisniNalogId" value={primkaServisa.servisniNalogId} onChange={handleChange} required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Dodaj
                </Button>
                <Link to={RoutesNames.PRIMKA_SERVISA} className="btn btn-danger ms-2">
                    Odustani
                </Link>
            </Form>
        </Container>
    );
}
