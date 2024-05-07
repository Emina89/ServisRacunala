import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import PrimkaServisaService from '../../service/PrimkaServisaService';
import ServisniNaloziService from '../../service/ServisniNaloziService';

export default function PrimkaServisaDodaj() {
    const navigate = useNavigate();
    const [primkaServisa, setPrimkaServisa] = useState({
        vrsta: '',
        model: '',
        servisniNalogId: '',
        opisKvara: '', // Dodajemo stanje za opis kvara
        servisniNalozi: [] // Dodajemo stanje za servisne naloge
    });

    useEffect(() => {
        // Dohvaćamo sve servisne naloge prilikom prvog renderiranja komponente
        async function dohvatiServisneNaloge() {
            const response = await ServisniNaloziService.get();
            if (!response.greska) {
                setPrimkaServisa(prevState => ({ ...prevState, servisniNalozi: response.poruka }));
            } else {
                console.log(response.poruka);
                alert('Pogledaj konzolu');
            }
        }

        dohvatiServisneNaloge();
    }, []);

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
                    <Form.Control as="select" name="servisniNalogId" value={primkaServisa.servisniNalogId} onChange={handleChange} required>
                        <option value="">Odaberi servisni nalog</option>
                        {primkaServisa.servisniNalozi.map(nalog => (
                            <option key={nalog.id} value={nalog.id}>{nalog.id}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="opisKvara">
                    <Form.Label>Opis Kvara</Form.Label>
                    <Form.Control type="text" name="opisKvara" value={primkaServisa.opisKvara} onChange={handleChange} required>
                        
                    </Form.Control>
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
