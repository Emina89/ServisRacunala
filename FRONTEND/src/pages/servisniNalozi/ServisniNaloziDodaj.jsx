import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ServisniNaloziService from '../../service/ServisniNaloziService';
import KlijentService from '../../service/KlijentService';

export default function ServisniNaloziDodaj() {
    const navigate = useNavigate();
    const [nalog, setNalog] = useState({ klijentId: '', datumNaloga: '', opisKvara: '' });
    const [klijenti, setKlijenti] = useState([]);

    useEffect(() => {
        async function fetchKlijenti() {
            const odgovor = await KlijentService.get();
            if (odgovor.greska) {
                console.log(odgovor.poruka);
                alert('Pogledaj konzolu');
                return;
            }
            setKlijenti(odgovor.poruka);
        }

        fetchKlijenti();
    }, []);

    async function dodajNalog() {
        const odgovor = await ServisniNaloziService.post(nalog);
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

    function handleSubmit(event) {
        event.preventDefault();
        dodajNalog();
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="klijentId">
                    <Form.Label>Klijent</Form.Label>
                    <Form.Select name="klijentId" onChange={handleInputChange}>
                        <option value="">Odaberite klijenta</option>
                        {klijenti.map((klijent, index) => (
                            <option key={index} value={klijent.id}>
                                {klijent.ime} {klijent.prezime}
                            </option>
                        ))}
                    </Form.Select>
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
