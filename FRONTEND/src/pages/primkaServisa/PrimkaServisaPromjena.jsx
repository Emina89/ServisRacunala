import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PrimkaServisaService from '../../service/PrimkaServisaService';

export default function PrimkaServisaPromjena() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [primka, setPrimka] = useState({});
    
    useEffect(() => {
        async function fetchData() {
            const odgovor = await PrimkaServisaService.getById(routeParams.id);
            if (odgovor.greska) {
                console.log(odgovor.poruka);
                alert('Pogledaj konzolu');
                return;
            }
            setPrimka(odgovor.poruka);
        }

        fetchData();
    }, [routeParams.id]);

    async function promjeniPrimku(novaPrimka) {
        const odgovor = await PrimkaServisaService.put(routeParams.id, novaPrimka);
        if (odgovor.greska) {
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate('/primka-servisa');
    }

    function handleSubmit(event) {
        event.preventDefault();
        const podaci = new FormData(event.target);
        const noviServisniNalog = {
            vrsta: podaci.get('vrsta'),
            model: podaci.get('model'),
            servisniNalogId: podaci.get('servisniNalogId')
        };
        const novaPrimka = {
            ...primka, // Koristimo postojeće podatke primke
            ...noviServisniNalog // Dodajemo nove podatke servisnog naloga
        };
        promjeniPrimku(novaPrimka);
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="vrsta">
                    <Form.Label>Vrsta</Form.Label>
                    <Form.Control type="text" name="vrsta" defaultValue={primka.vrsta} required />
                </Form.Group>

                <Form.Group controlId="model">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" name="model" defaultValue={primka.model} required />
                </Form.Group>

                <Form.Group controlId="servisniNalogId">
                    <Form.Label>Servisni Nalog ID</Form.Label>
                    <Form.Control type="text" name="servisniNalogId" defaultValue={primka.servisniNalogId} required />
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
