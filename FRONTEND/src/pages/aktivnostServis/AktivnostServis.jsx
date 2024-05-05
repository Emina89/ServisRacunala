import React, { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import AktivnostServisService from '../../service/AktivnostServisService';
import PrimkaServisaService from '../../service/PrimkaServisaService';
import moment from 'moment';

export default function AktivnostServis() {
    const [aktivnosti, setAktivnosti] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        dohvatiAktivnosti();
    }, []);

    async function dohvatiAktivnosti() {
        const odgovor = await AktivnostServisService.get();
        if (odgovor.greska) {
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        const aktivnosti = odgovor.poruka;

        setAktivnosti(aktivnosti);
    }

    async function obrisiAktivnost(id) {
        const odgovor = await AktivnostServisService._delete(id);
        if (odgovor.greska) {
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        dohvatiAktivnosti();
    }

    function formatirajDatum(datum) {
        return moment.utc(datum).format('DD. MM. YYYY. HH:mm');
    }

    return (
        <Container>
            <Button
                as={Link}
                to={RoutesNames.AKTIVNOST_SERVIS_NOVI}
                className="custom-blue-btn"
                style={{ width: '15%', marginRight: '5px' }}
            >
                Dodaj aktivnost servisa
            </Button>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>R.br.</th>
                        <th>Primka servisa</th>
                        <th>Datum aktivnosti</th>
                        <th>Opis aktivnosti</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {aktivnosti &&
                        aktivnosti.map((aktivnost, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{aktivnost.primkaServisa && `${aktivnost.primkaServisa.vrsta} ${aktivnost.primkaServisa.model}`}</td>
                                <td>{formatirajDatum(aktivnost.datumAktivnosti)}</td>
                                <td>{aktivnost.opisAktivnosti}</td>
                                <td>
                                    <Button
                                        onClick={() => navigate(`/aktivnost-servis/promjena/${aktivnost.id}`)}
                                        style={{ width: '50%', marginLeft: '5px' }}
                                    >
                                        Promjeni
                                    </Button>
                                    <Button
                                        onClick={() => obrisiAktivnost(aktivnost.id)}
                                        variant="danger"
                                        style={{ width: '50%', marginLeft: '5px' }}
                                    >
                                        Obriši
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Container>
    );
}
