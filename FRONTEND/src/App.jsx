import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RoutesNames } from './constants';
import NavBar from './components/NavBar';
import Pocetna from './pages/Pocetna';
import Klijenti from './pages/klijenti/Klijenti';
import KlijentiDodaj from './pages/klijenti/KlijentiDodaj';
import KlijentiPromjena from './pages/klijenti/KlijentiPromjena';
import ServisniNalozi from './pages/servisniNalozi/ServisniNalozi';
import ServisniNaloziDodaj from './pages/servisniNalozi/ServisniNaloziDodaj';
import ServisniNaloziPromjena from './pages/servisniNalozi/ServisniNaloziPromjena';
import PrimkaServisa from './pages/primkaServisa/PrimkaServisa'; // Importanje PrimkaServisa komponente
import PrimkaServisaDodaj from './pages/primkaServisa/PrimkaServisaDodaj'; // Importanje PrimkaServisaDodaj komponente
import PrimkaServisaPromjena from './pages/primkaServisa/PrimkaServisaPromjena';
import AktivnostServis from './pages/aktivnostServis/AktivnostServis';
import AktivnostServisDodaj from './pages/aktivnostServis/AktivnostServisDodaj';
import AktivnostServisPromjena from './pages/aktivnostServis/AktivnostServisPromjena';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />

        <Route path={RoutesNames.KLIJENT_PREGLED} element={<Klijenti />} />
        <Route path={RoutesNames.KLIJENT_NOVI} element={<KlijentiDodaj />} />
        <Route path={RoutesNames.KLIJENT_PROMJENI} element={<KlijentiPromjena />} />

        {/* Rute za servisne naloge */}
        <Route path={RoutesNames.SERVISNI_NALOZI_PREGLED} element={<ServisniNalozi />} />
        <Route path={RoutesNames.SERVISNI_NALOZI_NOVI} element={<ServisniNaloziDodaj />} />
        <Route path={RoutesNames.SERVISNI_NALOZI_PROMJENA} element={<ServisniNaloziPromjena />} />

        {/* Rute za Primku Servisa */}
        <Route path={RoutesNames.PRIMKA_SERVISA} element={<PrimkaServisa />} />
        <Route path={RoutesNames.PRIMKA_SERVISA_NOVI} element={<PrimkaServisaDodaj />} />
        <Route path={RoutesNames.PRIMKA_SERVISA_PROMJENA} element={<PrimkaServisaPromjena />} />

        <Route path={RoutesNames.AKTIVNOST_SERVIS_PREGLED} element={<AktivnostServis />} />
        <Route path={RoutesNames.AKTIVNOST_SERVIS_NOVI} element={<AktivnostServisDodaj />} />
        <Route path={RoutesNames.AKTIVNOST_SERVIS_PROMJENA} element={<AktivnostServisPromjena />} />
      </Routes>
    </>
  );
}

export default App;
