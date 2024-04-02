import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import KlijentService from "../../service/KlijentService";
import { useEffect, useState } from "react";


export default function KlijentiPromjena(){
    const navigate = useNavigate();
    const routeParams = useParams();
    const [klijent, setKlijent] = useState({});

   async function dohvatiKlijent(){
        const o = await KlijentService.getById(routeParams.id);
        if(o.greska){
            console.log(o.poruka);
            alert('pogledaj konzolu');
            return;
        }
        setKlijent(o.poruka);
   }

   async function promjeni(klijent){
    const odgovor = await KlijentService.put(routeParams.id,klijent);
    if (odgovor.greska){
        console.log(odgovor.poruka);
        alert('Pogledaj konzolu');
        return;
    }
    navigate(RoutesNames.KLIJENT_PREGLED);
}

   useEffect(()=>{
    dohvatiKlijent();
   },[]);

    function obradiSubmit(e){ 
        e.preventDefault();
        //alert('Dodajem klijenta');

        const podaci = new FormData(e.target);

        const klijent = {
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            email: podaci.get('email'),
            kontaktBroj: podaci.get('kontaktBroj'),
                      
        };
        //console.log(routeParams.id);
        //console.log(klijent);
        promjeni(klijent);

    }

    return (

        <Container>
        <Form onSubmit={obradiSubmit}>

            <Form.Group controlId="ime">
                <Form.Label>Ime</Form.Label>
                <Form.Control defaultValue={klijent.ime} type="text" name="ime" required />
            </Form.Group>

            <Form.Group controlId="prezime">
                <Form.Label>Prezime</Form.Label>
                <Form.Control defaultValue={klijent.prezime} type="text" name="prezime" />
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control defaultValue={klijent.email} type="text" name="email" />
            </Form.Group>

            <Form.Group controlId="kontaktBroj">
                <Form.Label>Kontakt Broj</Form.Label>
                <Form.Control defaultValue={klijent.kontaktBroj} type="text" name="kontaktBroj" />
            </Form.Group>

            

                <hr />
                <Row>
                    <Col>
                        <Link className="btn btn-danger siroko" to={RoutesNames.KLIJENT_PREGLED}>
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button className="siroko" variant="primary" type="submit">
                            Promjeni
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Container>

    );
}