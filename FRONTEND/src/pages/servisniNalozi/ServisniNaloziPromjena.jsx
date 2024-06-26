import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ServisniNaloziService from '../../service/ServisniNaloziService';
import KlijentService from '../../service/KlijentService';
import moment from 'moment';

export default function ServisniNaloziPromjena() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [nalog, setNalog] = useState({});
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

                odgovorNalog.poruka.datumNaloga = moment(odgovorNalog.poruka.datumNaloga).format('YYYY-MM-DD');

                setNalog(odgovorNalog.poruka);

                const odgovorKlijenti = await KlijentService.get();
                if (odgovorKlijenti.greska) {
                    console.log('Greška prilikom dohvatanja podataka o klijentima.');
                    alert('Pogledaj konzolu');
                    return;
                }
                setKlijenti(odgovorKlijenti.poruka);
            } catch (error) {
                console.error('Greška prilikom dohvatanja podataka:', error);
                alert('Došlo je do greške prilikom dohvatanja podataka.');
            }
        }

        fetchData();
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

    function obradiSubmit(e) {
        e.preventDefault();

        const podaci = new FormData(e.target);
        const noviNalog = {
            klijentId: podaci.get('klijentId'),
            datumNaloga: podaci.get('datumNaloga'),
            opisKvara: podaci.get('opisKvara'),
            imeKlijenta: podaci.get('imeKlijenta'),
            prezimeKlijenta: podaci.get('prezimeKlijenta')
        };

        promjeni(noviNalog);
    }

    function handleKlijentChange(event) {
        const selectedKlijentId = event.target.value;
        const selectedKlijent = klijenti.find(klijent => klijent.id === parseInt(selectedKlijentId));
        setNalog(prevNalog => ({
            ...prevNalog,
            klijentId: selectedKlijentId,
            imeKlijenta: selectedKlijent.ime,
            prezimeKlijenta: selectedKlijent.prezime,
        }));
    }

    return (
        <Container>
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="klijentId">
                    <Form.Label>Klijent</Form.Label>
                    <Form.Select name="klijentId" value={nalog.klijentId} onChange={handleKlijentChange}>
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
                    <Form.Control type="date" name="datumNaloga" defaultValue={nalog.datumNaloga} />
                </Form.Group>

                <Form.Group controlId="opisKvara">
                    <Form.Label>Opis kvara</Form.Label>
                    <Form.Control as="textarea" rows={3} name="opisKvara" defaultValue={nalog.opisKvara} />
                </Form.Group>

                <input type="hidden" name="imeKlijenta" value={nalog.imeKlijenta} />
                <input type="hidden" name="prezimeKlijenta" value={nalog.prezimeKlijenta} />

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
