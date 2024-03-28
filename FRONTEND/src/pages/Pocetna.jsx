import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';

export default function Pocetna() {
    const [animationClass, setAnimationClass] = useState('');

    // Funkcija koja se poziva kada se komponenta montira
    useEffect(() => {
        // Dodajte klasu za animaciju nakon određenog vremena (npr. 1 sekunda)
        setTimeout(() => {
            setAnimationClass('animate');
        }, 1000);
    }, []);

    return (
        <Container>
            <div className={`welcome-message ${animationClass}`}>
                Dobrodošli na aplikaciju za Servis Računala
            </div>
            <style jsx>{`
                .welcome-message {
                    font-size: 35px; /* Povećava font na 24px */
                    font-weight: bold; /* Postavlja debeli font */
                    color: purple; /* Postavlja crvenu boju teksta */
                    text-shadow: 8px 6px 8px rgba(0, 0, 0, 0.5); /* Dodaje osjenčanje tekstu */
                    text-align: center; /* Postavlja tekst na sredinu */
                    white-space: nowrap; /* Sprječava prelazak teksta u novi red */
                }
                .animate {
                    animation: moveLeftRight 4s infinite alternate; /* Dodaje animaciju */
                }
                @keyframes moveLeftRight {
                    0% {
                        transform: translateX(-50px); /* Početna pozicija - pomiče se ulijevo */
                    }
                    100% {
                        transform: translateX(50px); /* Krajnja pozicija - pomiče se udesno */
                    }
                }
            `}</style>
        </Container>
    );
}
