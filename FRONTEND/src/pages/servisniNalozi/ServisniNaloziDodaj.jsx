import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ServisniNaloziService from '../../service/ServisniNaloziService';

export default function ServisniNaloziDodaj() {
    const navigate = useNavigate();
    const [nalog, setNalog] = useState({ klijentId: '', datumNaloga: '', opisKvara: '' });

    async function dodajNalog() {
        const formattedDate = new Date(nalog.datumNaloga).toISOString().split('T')[0];
        const odgovor = await ServisniNaloziService.post({ ...nalog, datumNaloga: formattedDate });
        if (odgovor.greska) {
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate('/servisni-nalozi');
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setNalog({ ...nalog, [name]: value });
    }

    return (
        <Container>
            <Form onSubmit={dodajNalog}>
                <Form.Group controlId="klijentId">
                    <Form.Label>Klijent ID</Form.Label>
                    <Form.Control type="text" name="klijentId" value={nalog.klijentId} onChange={handleInputChange} required />
                </Form.Group>

                <Form.Group controlId="datumNaloga">
                    <Form.Label>Datum naloga</Form.Label>
                    <Form.Control type="date" name="datumNaloga" value={nalog.datumNaloga} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="opisKvara">
                    <Form.Label>Opis kvara</Form.Label>
                    <Form.Control as="textarea" rows={3} name="opisKvara" value={nalog.opisKvara} onChange={handleInputChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Dodaj
                </Button>

                <Link to="/servisni-nalozi" className="btn btn-danger ml-2">
                    Odustani
                </Link>
            </Form>
        </Container>
    );
}
