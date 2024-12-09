import { useState, createRef } from 'react';
import { Map, TileLayer, WMSTileLayer/* , Popup */, ZoomControl } from 'react-leaflet';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

// import L from 'leaflet';

import Enquadramentos from './Enquadramentos'

import styles from './styles.module.scss';


import Arrow from '../../images/arrow.svg?react';


const mapRef = createRef();
const position = [-15.559793, -62.58506];
const zoom = 5;

export default function MapGeneral({ staleTime = 3600000, /* 1h */ }) {

  const navigate = useNavigate()

  const [perspective, _perspective] = useState('ppea')

  const { data } = useQuery(['total_initiatives'], {
    queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}adm/statistics/total_iniciatives`)).data,
    staleTime,
  });

  const handlePerspective = (p) => () => {
    _perspective(p)
  }

  const navigateToPerspective = () => {
    navigate(`/sobre/${perspective}`)
  }

  return (<>
    <section id='perspectivas'>
      <div className="width-limiter">
        <div className="content">
          <div className="title-container">
            <div className="title perspectivas-1">Perspectivas</div>
            <div className="title perspectivas-2">do Sistema MonitoraEA</div>
          </div>
          {/* Novo quadrado com texto */}
          <div className='box-with-image'>
            <div className="box">
              {!data && <div className="number">...</div>}
              {data && <div className="number">{data}</div>}
              <div className="text red"><span className='text'>[</span>iniciativas<span className='text'>]</span></div>
              <div className="text">cadastradas</div>
            </div>

            <div className={styles['enquadramentos']}>
              <Enquadramentos />
            </div>

          </div>
        </div>
      </div>
    </section>

    <section id="mapa">
      <div className={styles.container}>
        <div className={styles['map-container']}>
          <Map center={position} zoomControl={false} zoom={zoom} ref={mapRef} maxZoom={18} minZoom={3} scrollWheelZoom={false} /*  onClick={handleMapClick} */>
            <TileLayer
              attribution='<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {perspective === 'pppzcm' && <WMSTileLayer
              url={import.meta.env.VITE_GEOSERVER_URL}
              layers="pppzcm:proj_atuacao"
              format="image/png"
              transparent={true}
              opacity={0.9}
            />}

            {perspective === 'ppea' && <WMSTileLayer
              url={import.meta.env.VITE_GEOSERVER_URL}
              layers="pppzcm:published_ppeas_special"
              format="image/png"
              transparent={true}
              opacity={0.5}
            />}

            <ZoomControl position="bottomright" />
          </Map>
        </div>

        <div className={`p-4 ${styles.perspective_panel}`}>
          <div className={`${styles.perspective} ${perspective === 'ppea' ? styles.active : ''}`} onClick={handlePerspective('ppea')}>Políticas Públicas de Educação Ambiental</div>
          <div className={`${styles.perspective} ${styles.disabled}`}>Projetos e Ações de Educação Ambiental</div>
          <div className={`${styles.perspective} ${styles.disabled}`}>Instâncias e Espaços de articulação e controle social</div>
          <div className={`${styles.perspective} ${perspective === 'pppzcm' ? styles.active : ''}`} onClick={handlePerspective('pppzcm')}>Projeto Político-Pedagógico da Zona Costeira e Marinha do Brasil</div>
          <div className={`${styles.perspective} ${styles.disabled}`}>Risco climático e a contribuição da Educação Ambiental</div>
        </div>

        <div className={`p-4 ${styles['perspective-access']}`}>
          <button className="button-more" onClick={navigateToPerspective}>
            Acesse a perspectiva selecionada
            <div className="icon">
              <Arrow />
            </div>
          </button>
        </div>
      </div>
    </section>
  </>)

}