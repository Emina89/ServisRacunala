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
                Servis Računala za sve Vaše kvarove i probleme
            </div>
            <style jsx>{`
                .welcome-message {
                    font-size: 35px; 
                    font-weight: bold; 
                    color: purple; 
                    text-shadow: 8px 6px 8px rgba(0, 0, 0, 0.5); 
                    text-align: center; 
                    white-space: nowrap; 
                }
                .animate {
                    animation: moveLeftRight 4s infinite alternate; 
                }
                @keyframes moveLeftRight {
                    0% {
                        transform: translateX(-50px); 
                    }
                    100% {
                        transform: translateX(50px); 
                    }
                }
            `}</style>
        </Container>
    );
}