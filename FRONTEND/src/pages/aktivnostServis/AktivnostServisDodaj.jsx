import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AktivnostServisService from '../../service/AktivnostServisService';
import PrimkaServisaService from '../../service/PrimkaServisaService';

export default function AktivnostServisDodaj() {
    const navigate = useNavigate();
    const [aktivnost, setAktivnost] = useState({ primkaServisaId: '', datumAktivnosti: '', opisAktivnosti: '' });
    const [primke, setPrimke] = useState([]);

    useEffect(() => {
        async function fetchPrimke() {
            const odgovor = await PrimkaServisaService.get();
            if (odgovor.greska) {
                console.log(odgovor.poruka);
                alert('Pogledaj konzolu');
                return;
            }
            setPrimke(odgovor.poruka);
        }

        fetchPrimke();
    }, []);

    async function dodajAktivnost() {
        const odgovor = await AktivnostServisService.post(aktivnost);
        if (odgovor.greska) {
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate('/aktivnost-servis');
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setAktivnost({ ...aktivnost, [name]: value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        dodajAktivnost();
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="primkaServisaId">
                    <Form.Label>Primka servisa</Form.Label>
                    <Form.Select name="primkaServisaId" onChange={handleInputChange}>
                        <option value="">Odaberite primku servisa</option>
                        {primke.map((primka, index) => (
                            <option key={index} value={primka.id}>
                                {primka.vrsta} {primka.model}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="datumAktivnosti">
                    <Form.Label>Datum aktivnosti</Form.Label>
                    <Form.Control type="date" name="datumAktivnosti" value={aktivnost.datumAktivnosti} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="opisAktivnosti">
                    <Form.Label>Opis aktivnosti</Form.Label>
                    <Form.Control as="textarea" rows={3} name="opisAktivnosti" value={aktivnost.opisAktivnosti} onChange={handleInputChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Dodaj
                </Button>

                <Link to="/aktivnost-servis" className="btn btn-danger ml-2">
                    Odustani
                </Link>
            </Form>
        </Container>
    );
}
