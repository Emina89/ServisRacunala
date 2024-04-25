import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import PrimkaServisaService from '../../service/PrimkaServisaService';

export default function PrimkaServisa(){
    const navigate = useNavigate();
    const routeParams = useParams();
    const [primka, setPrimkaServisa] = useState({});

   async function dohvatiPrimkaServisa(){
        const o = await PrimkaServisaService.getById(routeParams.id);
        if(o.greska){
            console.log(o.poruka);
            alert('pogledaj konzolu');
            return;
        }
        setPrimkaServisa(o.poruka);
   }

   async function promjeni(primka){
    const odgovor = await PrimkaServisaService.put(routeParams.id,primka);
    if (odgovor.greska){
        console.log(odgovor.poruka);
        alert('Pogledaj konzolu');
        return;
    }
    navigate(RoutesNames.PRIMKA_SERVISA);
}

   useEffect(()=>{
    dohvatiPrimkaServisa();
   },[]);

    function obradiSubmit(e){ 
        e.preventDefault();
        

        const podaci = new FormData(e.target);

        const primka = {
            vrsta: podaci.get('vrsta'),
            model: podaci.get('model'),
           servisniNalogId: podaci.get('servisniNalogId')
            
                      
        };
     
        promjeni(primka);

    }

    return (

        <Container>
        <Form onSubmit={obradiSubmit}>

            <Form.Group controlId="vrsta">
                <Form.Label>Vrsta</Form.Label>
                <Form.Control defaultValue={primka.vrsta} type="text" name="vrsta" required />
            </Form.Group>

            <Form.Group controlId="model">
                <Form.Label>Model</Form.Label>
                <Form.Control defaultValue={primka.model} type="text" name="model" />
            </Form.Group>

            <Form.Group controlId="servisniNalogId">
                <Form.Label>Servisni NalogId</Form.Label>
                <Form.Control defaultValue={primka.servisniNalogId} type="text" name="servisniNalogId" />
            </Form.Group>

    

            

                <hr />
                <Row>
                    <Col>
                        <Link className="btn btn-danger siroko" to={RoutesNames.PRIMKA_SERVISA}>
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