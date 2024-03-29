import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import KlijentService from '../../service/KlijentService';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {RoutesNames} from '../../constants'


export default function Klijenti(){
    const [klijenti, setKlijenti] = useState();
    const navigate = useNavigate();



    async function dohvatiKlijente(){
        await KlijentService.get()
        .then((odg)=>{
            setKlijenti(odg);
        })
        .catch((e)=>{
            console.log(e);
        });
    }

    useEffect(()=>{
        dohvatiKlijente();
    },[]);



    async function obrisiAsync(id){
        const odgovor = await KlijentService._delete(id);
        if (odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        dohvatiKlijente();
    }

    function obrisi(id){
        obrisiAsync(id);
    }

    return(
        <>
           <Container>
            <Link to={RoutesNames.KLIJENT_NOVI}> Dodaj </Link>
            <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>R.br.</th>
                            <th>Ime</th>
                            <th>Prezime</th>
                            <th>Email</th>
                            <th>KontakBroj</th>
                            <th>Akcija</th>
                        </tr>
                    </thead>
                    <tbody>
                    {klijenti && typeof klijenti === 'object' && Array.isArray(klijenti) && klijenti.map((klijent, index) => (

                            <tr key={index}>
                                <td>{index + 1}</td> 
                                <td>{klijent.ime}</td>
                                <td>{klijent.prezime}</td>
                                <td>{klijent.email}</td>
                                <td>{klijent.kontaktBroj}</td>
                                <td>
                                    
                                </td>
                                <td>
                                    <Button 
                                    onClick={()=>obrisi(klijent.id)}
                                    variant='danger'
                                    >
                                        Obriši
                                    </Button>
                                    <Button 
                                    onClick={()=>{navigate(`/klijenti/${klijent.id}`)}} 
                                    >
                                        Promjeni
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </Table>
           </Container>
        </>
    );
}