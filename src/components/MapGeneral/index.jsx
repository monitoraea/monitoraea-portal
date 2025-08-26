import { useState, createRef } from 'react';
import { Map, TileLayer, WMSTileLayer/* , Popup */, ZoomControl } from 'react-leaflet';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

// import L from 'leaflet';

import Enquadramentos from './Enquadramentos'

import styles from './styles.module.scss';


import title from '../../images/home_map_title.png';
import seta from '../../images/home_map_seta.png';


const mapRef = createRef();
const position = [-15.559793, -62.58506];
const zoom = 5;

export default function MapGeneral({ staleTime = 3600000, /* 1h */ }) {

  const isMobile = useMediaQuery({ maxWidth: 500 });

  const navigate = useNavigate()

  const [perspective, _perspective] = useState('ppea')

  const { data } = useQuery(['total_initiatives'], {
    queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}adm/statistics/total_iniciatives`)).data,
    staleTime,
  });

  const handlePerspective = (p) => () => {
    _perspective(p)
  }

  const navigateToPerspective = (perspective) => {
    navigate(`/sobre/${perspective}`)
  }

  return (<>
    <section className={styles.perspectivas}>
      {!isMobile && <div className={styles['width-limiter']}>
        <div className={styles.content}>
          
          <div className={styles['title-container']}>
            <div className={styles['perspectivas-1']}>Perspectivas</div>
            <div className={styles['perspectivas-2']}>do Sistema MonitoraEA</div>
          </div>

          {/* Novo quadrado com texto */}
          <div className='box-with-image'>
            <div className="box">
              {!data && <div className="number">...</div>}
              {data && <div className="number">{data}</div>}
              <div className="text">iniciativas</div>
              <div className="text">cadastradas</div>
            </div>

            <div className={styles['enquadramentos']}>
              <Enquadramentos />
            </div>

          </div>
        </div>
      </div>}
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

            {perspective === 'ciea' && <WMSTileLayer
              url={import.meta.env.VITE_GEOSERVER_URL}
              layers="pppzcm:ufs-staging"
              format="image/png"
              transparent={true}
              opacity={0.5}
            />}

            {perspective === 'centros-nucleos-equipamentos' && <WMSTileLayer
              url={import.meta.env.VITE_GEOSERVER_URL}
              layers="pppzcm:cecsa"
              format="image/png"
              transparent={true}
              opacity={0.8}
            />}

            {perspective === 'iniciativas' && <WMSTileLayer
              url={import.meta.env.VITE_GEOSERVER_URL}
              layers="pppzcm:iniciativas"
              format="image/png"
              transparent={true}
              opacity={0.8}
            />}

            <ZoomControl position="bottomright" />
          </Map>
        </div>

        {!isMobile && <div className={styles.perspective_panel}>
          <div className={styles.title_bar}>
            <img src={title} />
          </div>

          <div className={`p-4 ${styles.perspective_panel_options}`}>
            <div className={`${styles.perspective_container} ${perspective === 'ppea' ? styles.active : ''}`}>
              <div className={`${styles.perspective}`} onClick={handlePerspective('ppea')}>Políticas Públicas de Educação Ambiental</div>
              <div className={styles.acessar}><div className={styles.acessar_button} onClick={() => navigateToPerspective('ppea')}>Acessar a perspectiva selecionada <img src={seta} /></div></div>
            </div>
            <div className={`${styles.perspective_container} ${perspective === 'pppzcm' ? styles.active : ''}`}>
              <div className={`${styles.perspective}`} onClick={handlePerspective('pppzcm')}>Iniciativas vinculadas ao Projeto Político-Pedagógico da Zona Costeira e Marinha do Brasil</div>
              <div className={styles.acessar}><div className={styles.acessar_button} onClick={() => navigateToPerspective('pppzcm')}>Acessar a perspectiva selecionada <img src={seta} /></div></div>
            </div>
            <div className={`${styles.perspective_container} ${perspective === 'ciea' ? styles.active : ''}`}>
              <div className={`${styles.perspective}`} onClick={handlePerspective('ciea')}>Instâncias e Espaços de articulação e controle social (CA-OG, CIEA e CIMEA)</div>
              <div className={styles.acessar}><div className={styles.acessar_button} onClick={() => navigateToPerspective('ciea')}>Acessar a perspectiva selecionada <img src={seta} /></div></div>
            </div>
            <div className={`${styles.perspective_container} ${perspective === 'centros-nucleos-equipamentos' ? styles.active : ''}`}>
              <div className={`${styles.perspective}`} onClick={handlePerspective('centros-nucleos-equipamentos')}>Centros, Núcleos e Equipamentos de Educação e Cooperação Socioambiental</div>
              <div className={styles.acessar}><div className={styles.acessar_button} onClick={() => navigateToPerspective('centros-nucleos-equipamentos')}>Acessar a perspectiva selecionada <img src={seta} /></div></div>
            </div>
            <div className={`${styles.perspective_container} ${perspective === 'iniciativas' ? styles.active : ''}`}>
              <div className={`${styles.perspective}`} onClick={handlePerspective('iniciativas')}>Iniciativas não governamentais de Educação Ambiental</div>
              <div className={styles.acessar}><div className={styles.acessar_button} onClick={() => navigateToPerspective('iniciativas')}>Acessar a perspectiva selecionada <img src={seta} /></div></div>
            </div>
            <div className={styles.perspective_container}>
              <div className={`${styles.perspective} ${styles.disabled}`}>Risco climático e a contribuição da Educação Ambiental</div>
            </div>
          </div>
        </div>}

      </div>
    </section>

  </>)

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
              <div className="text">iniciativas</div>
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

            {perspective === 'ciea' && <WMSTileLayer
              url={import.meta.env.VITE_GEOSERVER_URL}
              layers="pppzcm:ufs-staging"
              format="image/png"
              transparent={true}
              opacity={0.5}
            />}

            {perspective === 'centros-nucleos-equipamentos' && <WMSTileLayer
              url={import.meta.env.VITE_GEOSERVER_URL}
              layers="pppzcm:cecsa"
              format="image/png"
              transparent={true}
              opacity={0.8}
            />}

            {perspective === 'iniciativas' && <WMSTileLayer
              url={import.meta.env.VITE_GEOSERVER_URL}
              layers="pppzcm:iniciativas"
              format="image/png"
              transparent={true}
              opacity={0.8}
            />}

            <ZoomControl position="bottomright" />
          </Map>
        </div>
        <div className={styles.perspective_panel}>
          <div className={styles.title_bar}>
            <img src={title} />
          </div>

          <div className={`p-4 ${styles.perspective_panel_options}`}>
            <div className={`${styles.perspective_container} ${perspective === 'ppea' ? styles.active : ''}`}>
              <div className={`${styles.perspective}`} onClick={handlePerspective('ppea')}>Políticas Públicas de Educação Ambiental</div>
              <div className={styles.acessar}><div className={styles.acessar_button} onClick={() => navigateToPerspective('ppea')}>Acessar a perspectiva selecionada <img src={seta} /></div></div>
            </div>
            <div className={`${styles.perspective_container} ${perspective === 'pppzcm' ? styles.active : ''}`}>
              <div className={`${styles.perspective}`} onClick={handlePerspective('pppzcm')}>Iniciativas vinculadas ao Projeto Político-Pedagógico da Zona Costeira e Marinha do Brasil</div>
              <div className={styles.acessar}><div className={styles.acessar_button} onClick={() => navigateToPerspective('pppzcm')}>Acessar a perspectiva selecionada <img src={seta} /></div></div>
            </div>
            <div className={`${styles.perspective_container} ${perspective === 'ciea' ? styles.active : ''}`}>
              <div className={`${styles.perspective}`} onClick={handlePerspective('ciea')}>Instâncias e Espaços de articulação e controle social (CA-OG, CIEA e CIMEA)</div>
              <div className={styles.acessar}><div className={styles.acessar_button} onClick={() => navigateToPerspective('ciea')}>Acessar a perspectiva selecionada <img src={seta} /></div></div>
            </div>
            <div className={`${styles.perspective_container} ${perspective === 'centros-nucleos-equipamentos' ? styles.active : ''}`}>
              <div className={`${styles.perspective}`} onClick={handlePerspective('centros-nucleos-equipamentos')}>Centros, Núcleos e Equipamentos de Educação e Cooperação Socioambiental</div>
              <div className={styles.acessar}><div className={styles.acessar_button} onClick={() => navigateToPerspective('centros-nucleos-equipamentos')}>Acessar a perspectiva selecionada <img src={seta} /></div></div>
            </div>
            <div className={`${styles.perspective_container} ${perspective === 'iniciativas' ? styles.active : ''}`}>
              <div className={`${styles.perspective}`} onClick={handlePerspective('iniciativas')}>Iniciativas não governamentais de Educação Ambiental</div>
              <div className={styles.acessar}><div className={styles.acessar_button} onClick={() => navigateToPerspective('iniciativas')}>Acessar a perspectiva selecionada <img src={seta} /></div></div>
            </div>
            <div className={styles.perspective_container}>
              <div className={`${styles.perspective} ${styles.disabled}`}>Risco climático e a contribuição da Educação Ambiental</div>
              {/* <div className={styles.acessar}><div className={styles.acessar_button} onClick={()=>navigateToPerspective('ppea')}>Acessar a perspectiva selecionada <img src={seta} /></div></div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  </>)

}