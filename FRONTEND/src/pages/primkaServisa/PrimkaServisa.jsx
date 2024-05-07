import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import PrimkaServisaService from '../../service/PrimkaServisaService';
import ServisniNaloziService from '../../service/ServisniNaloziService'; // Dodajte uvoz za ServisniNaloziService

export default function PrimkaServisa() {
    const [primkaServisa, setPrimkaServisa] = useState([]);

    useEffect(() => {
        dohvatiPrimkaServisa();
    }, []);

    const dohvatiPrimkaServisa = async () => {
        const response = await PrimkaServisaService.get();
        if (!response.greska) {
            // Ako su podaci o primkama servisa uspješno dohvaćeni
            const primke = response.poruka;
            // Iteriraj kroz svaku primku servisa i dohvati podatke o opisu kvara putem servisnog naloga
            for (const primka of primke) {
                const responseNalog = await ServisniNaloziService.getById(primka.servisniNalogId);
                if (!responseNalog.greska) {
                    // Ako su podaci o servisnom nalogu uspješno dohvaćeni
                    // Postavi podatke o opisu kvara za svaku primku servisa
                    primka.opisKvara = responseNalog.poruka.opisKvara;
                } else {
                    console.log(responseNalog.poruka);
                    alert('Neuspješno dohvaćanje podataka o opisu kvara.');
                }
            }
            // Postavi ažurirane podatke o primkama servisa u stanje komponente
            setPrimkaServisa(primke);
        } else {
            console.log(response.poruka);
            alert('Neuspješno dohvaćanje primki servisa.');
        }
    };

    // Funkcija za brisanje primke servisa
    const obrisiPrimkaServisa = async (id) => {
        const response = await PrimkaServisaService._delete(id);
        if (!response.greska) {
            dohvatiPrimkaServisa();
        } else {
            console.log(response.poruka);
            alert('Neuspješno brisanje primke servisa.');
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
                        <th>Opis kvara</th>
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
                            <td>{primka.opisKvara}</td>
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
