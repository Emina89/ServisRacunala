import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import PrimkaServisaService from '../../service/PrimkaServisaService';

export default function PrimkaServisa() {
    const [primkaServisa, setPrimkaServisa] = useState([]);

    useEffect(() => {
        dohvatiPrimkaServisa();
    }, []);

    const dohvatiPrimkaServisa = async () => {
        const response = await PrimkaServisaService.get();
        if (!response.greska) {
            setPrimkaServisa(response.poruka);
        } else {
            console.log(response.poruka);
            alert('Pogledaj konzolu');
        }
    };

    const obrisiPrimkaServisa = async (id) => {
        const response = await PrimkaServisaService._delete(id);
        if (!response.greska) {
            dohvatiPrimkaServisa();
        } else {
            console.log(response.poruka);
            alert('Ne možete obrisati primku servisa jer je povezana sa servisnim nalogom.');
        }
    };

    return (
        <Container>
            <Link to={RoutesNames.PRIMKA_SERVISA_NOVI} className="btn btn-primary mb-3">
                Dodaj Primku Servisa
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Vrsta</th>
                        <th>Model</th>
                        <th>Servisni Nalog ID</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {primkaServisa.map((primka, index) => (
                        <tr key={index}>
                            <td>{primka.id}</td>
                            <td>{primka.vrsta}</td>
                            <td>{primka.model}</td>
                            <td>{primka.servisniNalogId}</td>

                            <td>
                                <Button variant="danger" onClick={() => obrisiPrimkaServisa(primka.id)}>
                                    Obriši
                                </Button>
                                <Link to={`${RoutesNames.PRIMKA_SERVISA}/${primka.id}`} className="btn btn-primary mx-2">
                                    Promjeni
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
