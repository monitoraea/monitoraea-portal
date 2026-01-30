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

import Enter from '../icons/log-in2.svg?react';

const mapRef = createRef();
const position = [-15.559793, -62.58506];
const positionMobile = [-15.559793, -50.58506];
const zoom = 5;
const zoomMobile = 4;

export default function MapGeneral({ staleTime = 3600000, /* 1h */ }) {

  const isMobile = useMediaQuery({ maxWidth: 500 });

  const navigate = useNavigate()

  const [perspective, _perspective] = useState('ppea')
  const [menu_mobile_open, _menu_mobile_open] = useState(false)

  const { data } = useQuery(['total_initiatives'], {
    queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}adm/statistics/total_iniciatives`)).data,
    staleTime,
  });

  const handlePerspective = (p) => () => {
    _perspective(p)
    _menu_mobile_open(false)
  }

  const navigateToPerspective = (perspective) => {
    navigate(`/sobre/${perspective}`)
  }

  return (<>
    <section className={styles.perspectivas}>
      <div className={styles['width-limiter']}>
        <div className={styles.content}>

          <div className={styles['title-container']}>
            <div className={styles['perspectivas-1']}>Perspectivas</div>
            <div className={styles['perspectivas-2']}>do Sistema MonitoraEA</div>
          </div>

          <div className={styles.dash}>
            <div className={styles['box-with-image']}>
              <div className={styles.box}>
                {!data && <div className={styles.number}>...</div>}
                {data && <div className={styles.number}>{data}</div>}
                <div className={styles.text}>iniciativas</div>
                <div className={styles.text}>cadastradas</div>
              </div>

              <div className={styles['enquadramentos']}>
                <Enquadramentos mobile={isMobile} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="mapa" className={styles.map_container}>

      {isMobile && <div className={`${styles.map_menu} ${menu_mobile_open ? styles.open : ''}`}>
        <div className={styles.menu_header}>
          <div>Perspectivas do Sistema MonitoraEA</div>
          <div className={styles.close} onClick={() => _menu_mobile_open(false)}>x</div>
        </div>
        <ul className={`p-4 ${styles.options}`}>

          <li className={`${perspective === 'ppea' ? styles.active : ''}`} onClick={handlePerspective('ppea')}>
            <div className={styles.title}>Políticas Públicas de Educação Ambiental</div>
            <div className={styles.enter} onClick={() => navigateToPerspective('ppea')}>
              <Enter />
            </div>
          </li>
          <li className={`${perspective === 'pppzcm' ? styles.active : ''}`} onClick={handlePerspective('pppzcm')}>
            <div className={styles.title}>Iniciativas vinculadas ao Projeto Político-Pedagógico da Zona Costeira e Marinha do Brasil</div>
            <div className={styles.enter} onClick={() => navigateToPerspective('pppzcm')}>
              <Enter />
            </div>
          </li>
          <li className={`${perspective === 'colegiados' ? styles.active : ''}`} onClick={handlePerspective('colegiados')}>
            <div className={styles.title}>Colegiados de Políticas Públicas de Educação Ambiental</div>
            <div className={styles.enter} onClick={() => navigateToPerspective('colegiados')}>
              <Enter />
            </div>
          </li>
          <li className={`${perspective === 'centros-nucleos-equipamentos' ? styles.active : ''}`} onClick={handlePerspective('centros-nucleos-equipamentos')}>
            <div className={styles.title}>Centros, Núcleos e Equipamentos de Educação e Cooperação Socioambiental</div>
            <div className={styles.enter} onClick={() => navigateToPerspective('centros-nucleos-equipamentos')}>
              <Enter />
            </div>
          </li>
          <li className={`${perspective === 'iniciativas' ? styles.active : ''}`} onClick={handlePerspective('iniciativas')}>
            <div className={styles.title}>Iniciativas não governamentais de Educação Ambiental</div>
            <div className={styles.enter} onClick={() => navigateToPerspective('iniciativas')}>
              <Enter />
            </div>
          </li>
          <li className={` ${styles.disabled}`}>Risco climático e a contribuição da Educação Ambiental</li>

        </ul>
      </div>}
      {isMobile && <div className={`${styles.map_menu_button}`} onClick={() => _menu_mobile_open(true)}>
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="#fff" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </div>}

      <div className={styles.container}>
        <div className={styles['map-container']}>
          <Map center={!isMobile ? position : positionMobile} zoomControl={false} zoom={!isMobile ? zoom : zoomMobile} ref={mapRef} maxZoom={18} minZoom={!isMobile ? 3 : 1} scrollWheelZoom={false} /*  onClick={handleMapClick} */>
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

            {perspective === 'colegiados' && <WMSTileLayer
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

            <ZoomControl position="bottomleft" />
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
            <div className={`${styles.perspective_container} ${perspective === 'colegiados' ? styles.active : ''}`}>
              <div className={`${styles.perspective}`} onClick={handlePerspective('colegiados')}>Colegiados de Políticas Públicas de Educação Ambiental</div>
              <div className={styles.acessar}><div className={styles.acessar_button} onClick={() => navigateToPerspective('colegiados')}>Acessar a perspectiva selecionada <img src={seta} /></div></div>
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

}