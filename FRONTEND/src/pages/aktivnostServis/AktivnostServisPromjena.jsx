import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AktivnostServisService from '../../service/AktivnostServisService';

export default function AktivnostServisPromjena() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [aktivnost, setAktivnost] = useState({});

    useEffect(() => {
        async function fetchData() {
            const odgovor = await AktivnostServisService.getById(routeParams.id);
            if (odgovor.greska) {
                console.log(odgovor.poruka);
                alert('Pogledaj konzolu');
                return;
            }
            setAktivnost(odgovor.poruka);
        }

        fetchData();
    }, [routeParams.id]);

    async function promjeniAktivnost(novaAktivnost) {
        const odgovor = await AktivnostServisService.put(routeParams.id, novaAktivnost);
        if (odgovor.greska) {
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate('/aktivnost-servis');
    }

    function handleSubmit(event) {
        event.preventDefault();
        const podaci = new FormData(event.target);
        const novaAktivnost = {
            primkaServisaId: podaci.get('primkaServisaId'),
            datumAktivnosti: podaci.get('datumAktivnosti'),
            opisAktivnosti: podaci.get('opisAktivnosti')
        };
        promjeniAktivnost(novaAktivnost);
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="primkaServisaId">
                    <Form.Label>Primka servisa</Form.Label>
                    <Form.Control type="text" name="primkaServisaId" defaultValue={aktivnost.primkaServisaId} required />
                </Form.Group>

                <Form.Group controlId="datumAktivnosti">
                    <Form.Label>Datum aktivnosti</Form.Label>
                    <Form.Control type="date" name="datumAktivnosti" defaultValue={aktivnost.datumAktivnosti} required />
                </Form.Group>

                <Form.Group controlId="opisAktivnosti">
                    <Form.Label>Opis aktivnosti</Form.Label>
                    <Form.Control as="textarea" rows={3} name="opisAktivnosti" defaultValue={aktivnost.opisAktivnosti} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Promjeni
                </Button>

                <Link to="/aktivnost-servis" className="btn btn-danger ml-2">
                    Odustani
                </Link>
            </Form>
        </Container>
    );
}
