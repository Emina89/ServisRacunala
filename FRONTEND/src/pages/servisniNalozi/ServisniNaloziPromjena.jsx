import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ServisniNaloziService from '../../service/ServisniNaloziService';

export default function ServisniNaloziPromjena() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [nalog, setNalog] = useState({});

    async function dohvatiNalog() {
        const odgovor = await ServisniNaloziService.getById(routeParams.id);
        if (odgovor.greska) {
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        setNalog(odgovor.poruka);
    }

    async function promjeni(nalog) {
        const odgovor = await ServisniNaloziService.put(routeParams.id, nalog);
        if (odgovor.greska) {
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.SERVISNI_NALOZI_PREGLED);
    }

    useEffect(() => {
        dohvatiNalog();
    }, []);

    function obradiSubmit(e) {
        e.preventDefault();

        const podaci = new FormData(e.target);

        const nalog = {
            klijentiId: podaci.get('klijentiId'),
            datumNaloga: podaci.get('datumNaloga'),
            opisKvara: podaci.get('opisKvara'),
        };

        promjeni(nalog);
    }

    return (
        <Container>
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="klijentiId">
                    <Form.Label>Klijent ID</Form.Label>
                    <Form.Control defaultValue={nalog.klijentiId} type="text" name="klijentiId" required />
                </Form.Group>

                <Form.Group controlId="datumNaloga">
                    <Form.Label>Datum naloga</Form.Label>
                    <Form.Control defaultValue={nalog.datumNaloga} type="date" name="datumNaloga" />
                </Form.Group>

                <Form.Group controlId="opisKvara">
                    <Form.Label>Opis kvara</Form.Label>
                    <Form.Control defaultValue={nalog.opisKvara} as="textarea" rows={3} name="opisKvara" />
                </Form.Group>

                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={1} xxl={2}>
                        <Link className="btn btn-danger siroko" to={RoutesNames.SERVISNI_NALOZI_PREGLED}>
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={1} xxl={10}>
                        <Button className="siroko" variant="primary" type="submit">
                            Promjeni
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
