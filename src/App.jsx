import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'

import './app.scss';
import 'leaflet/dist/leaflet.css';
// import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query'

import axios from 'axios';
import Footer from './components/footer/footer';
import Home from './pages/Home/Home';
import Facilitadores from './pages/Facilitadores/Facilitadores';
import Novidades from './pages/Novidades/Novidades';
import NovidadeSingle from './pages/NovidadeSingle/NovidadeSingle';
import PPEA from './pages/PPEA/PPEA';
import ING from './pages/ING/ING';
import EDUCLI from './pages/EDUCLI/EDUCLI';
import CECSA from './pages/CECSA/CECSA';
import PPPZCM from './pages/PPPZCM/PPPZCM';
import CIEA from './pages/CIEA/CIEA';
import Risco from './pages/Risco/Risco';
import ANPPEA from './pages/ANPPEA/';
import Publications from './pages/Publications';
import Monitora from './pages/Monitora/Monitora';
import ScrollToTop from './components/ScrollTop';
import Login from './pages/Login';

import SingleProjeto from './pages/SingleProjeto';
import SingleCentro from  './pages/SingleCentro';
import SingleCIEA from  './pages/SingleCIEA';
import SinglePPEA from  './pages/SinglePPEA';
import SingleING from  './pages/SingleING';

dayjs.locale('pt-br')

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: async ({ queryKey }) => (await axios.get(`${import.meta.env.VITE_SERVER}${queryKey}`)).data,
        retry: false,
      },
    },
  })

  return (<QueryClientProvider client={queryClient}>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/facilitadores" element={<Facilitadores />} />
        <Route path="/novidades/:content_type/:portal?" element={<Novidades />} />
        <Route path="/novidade-single/:id" element={<NovidadeSingle />} />
        <Route path="/page/:id" element={<NovidadeSingle />} />
        <Route path="/iniciativa/pppzcm/:id" element={<SingleProjeto />} />
        <Route path="/iniciativa/cecsa/:id" element={<SingleCentro />} />
        <Route path="/iniciativa/ciea/:id" element={<SingleCIEA />} />
        <Route path="/iniciativa/ppea/:id" element={<SinglePPEA />} />
        <Route path="/iniciativa/iniciativa/:id" element={<SingleING />} />
        <Route path="/sobre" element={<Monitora />} />
        <Route path="/sobre/ppea" element={<PPEA />} />
        <Route path="/sobre/iniciativas" element={<ING />} />
        <Route path="/sobre/educom_clima" element={<EDUCLI />} />
        <Route path="/sobre/centros-nucleos-equipamentos" element={<CECSA />} />
        <Route path="/sobre/ciea" element={<CIEA />} />
        <Route path="/sobre/risco_climatico" element={<Risco />} />
        <Route path="/sobre/pppzcm" element={<PPPZCM />} />
        <Route path="/sobre/anppea" element={<ANPPEA />} />
        <Route path="/publicacoes" element={<Publications />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  </QueryClientProvider>);
}

export default App;
