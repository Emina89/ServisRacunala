// ServisniNaloziPromjena.js
import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ServisniNaloziService from '../../service/ServisniNaloziService';
import KlijentService from '../../service/KlijentService';
import moment from 'moment';

export default function ServisniNaloziPromjena() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [nalog, setNalog] = useState({ klijentId: '', datumNaloga: '', opisKvara: '' });
    const [klijenti, setKlijenti] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const odgovorNalog = await ServisniNaloziService.getById(routeParams.id);
                if (odgovorNalog.greska) {
                    console.log(odgovorNalog.poruka);
                    alert('Pogledaj konzolu');
                    return;
                }
                 // Koristite moment za formatiranje datuma
            odgovorNalog.poruka.datumNaloga = moment(odgovorNalog.poruka.datumNaloga).format('YYYY-MM-DD');

            setNalog(odgovorNalog.poruka);
        } catch (error) {
            console.error('Greška prilikom dohvatanja podataka:', error);
            alert('Došlo je do greške prilikom dohvatanja podataka.');
        }
    }

        async function fetchKlijenti() {
            try {
                const odgovor = await KlijentService.get();
                if (odgovor.greska) {
                    console.log(odgovor.poruka);
                    alert('Pogledaj konzolu');
                    return;
                }
                setKlijenti(odgovor.poruka);
            } catch (error) {
                console.error('Greška prilikom dohvatanja klijenata:', error);
                alert('Došlo je do greške prilikom dohvatanja klijenata.');
            }
        }

        fetchData();
        fetchKlijenti();
    }, [routeParams.id]);

    async function promjeni(noviNalog) {
        const odgovor = await ServisniNaloziService.put(routeParams.id, noviNalog);
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
        promjeni(nalog);
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="klijentId">
                    <Form.Label>Klijent</Form.Label>
                    <Form.Select name="klijentId" value={nalog.klijentId} onChange={handleInputChange}>
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
                    Promjeni
                </Button>

                <Link to="/servisni-nalozi" className="btn btn-danger ml-2">
                    Odustani
                </Link>
            </Form>
        </Container>
    );
}
