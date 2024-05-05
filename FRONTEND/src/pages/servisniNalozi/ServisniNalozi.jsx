import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import ServisniNaloziService from '../../service/ServisniNaloziService';
import KlijentService from '../../service/KlijentService';
import moment from 'moment';

export default function ServisniNalozi() {
    const [nalazi, setNalazi] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        dohvatiNalaze();
    }, []);

    async function dohvatiNalaze() {
        const odgovor = await ServisniNaloziService.get();
        if (odgovor.greska) {
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        const nalazi = odgovor.poruka;

        // Učitaj podatke o klijentima za svaki servisni nalog
        for (const nalog of nalazi) {
            const odgovorKlijent = await KlijentService.getById(nalog.klijentId);
            if (odgovorKlijent.greska) {
                console.log('Greška prilikom dohvatanja podataka o klijentu.');
                alert('Pogledaj konzolu');
                return;
            }
            nalog.klijent = odgovorKlijent.poruka;
        }

        setNalazi(nalazi);
    }

    async function obrisiNalog(id) {
        // Provjeri da li postoje povezani klijenti
        const nalog = nalazi.find(nalog => nalog.id === id);
        if (!nalog) {
            console.log('Servisni nalog ne postoji.');
            return;
        }
        const klijent = nalog.klijent;
        if (klijent) {
            alert('Ne možete obrisati servisni nalog jer je povezan sa klijentom.');
            return;
        }

        const odgovor = await ServisniNaloziService._delete(id);
        if (odgovor.greska) {
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        dohvatiNalaze();
    }

    function formatirajDatum(datumNalogaa) {
        let mdp = moment.utc(datumNalogaa);
        if (mdp.hour() === 0 && mdp.minutes() === 0) {
            return mdp.format('DD. MM. YYYY.');
        }
        return mdp.format('DD. MM. YYYY. HH:mm');
    }

    return (
        <Container>
            <Button
                as={Link}
                to={RoutesNames.SERVISNI_NALOZI_NOVI}
                className="custom-blue-btn"
                style={{ width: '15%', marginRight: '5px' }}
            >
                Dodaj servisni nalog
            </Button>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>R.br.</th>
                        <th>Klijent</th>
                        <th>Datum naloga</th>
                        <th>Opis kvara</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {nalazi &&
                        nalazi.map((nalog, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{nalog.klijent ? `${nalog.klijent.ime} ${nalog.klijent.prezime}` : ''}</td>
                                <td>
                                    <p>
                                        {nalog.datumNaloga
                                            ? formatirajDatum(nalog.datumNaloga)
                                            : 'Nije definirano'}
                                    </p>
                                </td>
                                <td>{nalog.opisKvara}</td>
                                <td>
                                    <Button
                                        onClick={() => navigate(`/servisni-nalozi/promjena/${nalog.id}`)}
                                        style={{ width: '50%', marginLeft: '5px' }}
                                    >
                                        Promjeni
                                    </Button>
                                    <Button
                                        onClick={() => obrisiNalog(nalog.id)}
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
