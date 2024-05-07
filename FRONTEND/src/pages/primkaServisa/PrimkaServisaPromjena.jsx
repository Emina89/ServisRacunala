import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

import PrimkaServisaService from '../../service/PrimkaServisaService';
import ServisniNaloziService from '../../service/ServisniNaloziService';

export default function PrimkaServisaPromjena() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [primka, setPrimka] = useState({});
    const [servisniNalog, setServisniNalog] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const odgovorPrimke = await PrimkaServisaService.getById(routeParams.id);
                if (odgovorPrimke.greska) {
                    console.log(odgovorPrimke.poruka);
                    alert('Pogledaj konzolu');
                    return;
                }
                setPrimka(odgovorPrimke.poruka);

                // Dohvati servisni nalog
                const odgovorServisnogNaloga = await ServisniNaloziService.getById(odgovorPrimke.poruka.servisniNalogId);
                if (odgovorServisnogNaloga.greska) {
                    console.log(odgovorServisnogNaloga.poruka);
                    alert('Pogledaj konzolu');
                    return;
                }
                setServisniNalog(odgovorServisnogNaloga.poruka);
            } catch (error) {
                console.error('Greška prilikom dohvatanja podataka:', error);
                alert('Došlo je do greške prilikom dohvatanja podataka.');
            }
        }

        fetchData();
    }, [routeParams.id]);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setPrimka({ ...primka, [name]: value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const odgovor = await PrimkaServisaService.put(routeParams.id, primka);
            if (odgovor.greska) {
                console.log(odgovor.poruka);
                alert('Pogledaj konzolu');
                return;
            }
            navigate('/primka-servisa');
        } catch (error) {
            console.error('Greška prilikom ažuriranja podataka:', error);
            alert('Došlo je do greške prilikom ažuriranja podataka.');
        }
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="vrsta">
                    <Form.Label>Vrsta</Form.Label>
                    <Form.Control type="text" name="vrsta" value={primka.vrsta || ''} onChange={handleInputChange} required />
                </Form.Group>

                <Form.Group controlId="model">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" name="model" value={primka.model || ''} onChange={handleInputChange} required />
                </Form.Group>

                <Form.Group controlId="servisniNalogId">
                    <Form.Label>Servisni Nalog ID</Form.Label>
                    <Form.Control type="text" name="servisniNalogId" value={primka.servisniNalogId || ''} onChange={handleInputChange} required />
                </Form.Group>

                <Form.Group controlId="opisKvara">
                    <Form.Label>Opis kvara</Form.Label>
                    <Form.Control type="text" name="opisKvara" value={primka.opisKvara || ''} onChange={handleInputChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Promjeni
                </Button>

                <Link to="/primka-servisa" className="btn btn-danger ml-2">
                    Odustani
                </Link>
            </Form>
        </Container>
    );
}
