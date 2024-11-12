import Nav from '../../components/nav/nav';
import bg from './bg.png';
import { Link } from 'react-router-dom';
import imgplaceholder from './placeholder.png';
import logoanppea from './logo-anppea.png';
import pp from './pp.png';
import pppzcm from './pppzcm.png';
import imgsobre from './sobre.png';
import imgnov1 from './novidade1.png';
import imgnov2 from './novidade2.png';
import imgnov3 from './novidade3.png';
import imgnov4 from './novidade4.png';
import './style.scss';

import DynamicContent from '../../components/DynamicContent';
import ContentByType from '../../components/ContentByType';
import Faq from '../../components/Faq';

import MapGeneral from '../../components/MapGeneral';

import { content_types } from '../../utils';
import { isVisible } from '@testing-library/user-event/dist/utils';

function Home() {
  return (
    <>
      <div className="banner">
        <img className="bg" src={bg} alt="" />
        <div className="backdrop"></div>
        <div className="content">
          <div className="title">NOVO</div>
        </div>
      </div>
      <Nav />
      <section id="sobre">
        <div className="width-limiter">
          <img src={imgsobre} />
        </div>
      </section>
      <section id="fique_por_dentro">
        <div className="width-limiter">
          <div className="section-header">
            <div className="section-title">Fique por dentro</div>
          </div>
          <div className='loop'>
            <a href="/novidade-single/1" style={{ width: 'calc(33.33% - 1.5rem)' }}>
              <div className="loop-item" >
                <img src={imgnov1} alt="Figura Descritiva" className="image" />
              </div>
              <div className="info-box">
                <div className="left-section" style={{ backgroundColor: '#faad23' }}>Instâncias e Espaços</div>
                <div className="right-section">Outubro | 2024</div>
              </div>
              {/* Texto fixo em negrito abaixo do infobox */}
              <div className="fixed-text">
                Projeto MonitoraEA CIEA realiza oficina de construção de indicadores da região Norte</div>
              {/* Breve descrição abaixo do texto fixo */}
              <div className="description-text">
                <strong>Breve descrição</strong><br />
                XXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXX XXXXXXXXX XXXXXXXXX XX XXXXXXXXX XXXXXXX XX XXXXXXXX XXXXXX
              </div>
            </a>
            <a href="/novidade-single/2" style={{ width: 'calc(33.33% - 1.5rem)' }}>
              <div className="loop-item" >
                <img src={imgnov2} alt="Figura Descritiva" className="image" />
              </div>
              <div className="info-box">
                <div className="left-section" style={{ backgroundColor: '#409a4d' }}>Políticas Públicas e Projetos</div>
                <div className='right-section'> Novembro | 2024</div>
              </div>
              {/* Texto fixo em negrito abaixo do infobox */}
              <div className="fixed-text">ANPPEA realiza formação de professores no Pará em parceria com a SEDUC-PA</div>
              {/* Breve descrição abaixo do texto fixo */}
              <div className="description-text">
                <strong>Breve descrição</strong><br />
                XXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXX XXXXXXXXX XXXXXXXXX XX XXXXXXXXX XXXXXXX XX XXXXXXXX XXXXXX
              </div>
            </a>
            <a href="/novidade-single/3" style={{ width: 'calc(33.33% - 1.5rem)' }}>
              <div className="loop-item">
                <img src={imgnov3} alt="Figura Descritiva" className="image" />
              </div>
              <div className="info-box">
                <div className="left-section" style={{ backgroundColor: '#3c6dbc' }}>Risco Climático</div>
                <div className='right-section'> Novembro | 2024</div>
              </div>
              {/* Texto fixo em negrito abaixo do infobox */}
              <div className="fixed-text">Projeto MonitoraEA CIEA publica relatório de percepção de riscos climáticos a partir das CIEA</div>
              {/* Breve descrição abaixo do texto fixo */}
              <div className="description-text">
                <strong>Breve descrição</strong><br />
                XXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXX XXXXXXXXX XXXXXXXXX XX XXXXXXXXX XXXXXXX XX XXXXXXXX XXXXXX
              </div>
            </a>
          </div>
          <a href="/novidades/news">
            <button className="btn-link">
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                  <path d="M7.05566 9.94455L11.5001 5.50011L7.05566 1.05566" stroke="#599559" strokeLinecap="round" strokeLinejoin="round">
                  </path>
                  <path d="M11.4997 5.5H0.833008" stroke="#599559" strokeLinecap="round" strokeLinejoin="round">
                  </path>
                </svg>
              </div>
              Ver todas
            </button>
          </a>
        </div >
      </section >

      <section id="perguntas_frequentes">
        <div className="width-limiter">
          <div className="info-box" style={{ width: 'calc(50%)' }}>
            <div className="left-section" style={{ backgroundColor: '#2d8bba' }}>Perguntas Frequentes</div>
            <div className='right-section'> </div>
          </div>
        </div>
        <Faq />
      </section>

      <MapGeneral />

      {
        ['news', 'learning'].map(c => <ContentByType
          key={c}
          id={content_types[c][2]}
          contentType={c}
          title={content_types[c][1]}
          moreText={content_types[c][3]}
        />)
      }



      <section id="conselho">
        <div className="width-limiter">
          <div className="section-header">
            <div className="section-title">Conselho Institucional</div>
          </div>
          <div className="logos">
            <img src={imgplaceholder} alt="" className="logo" />
            <img src={imgplaceholder} alt="" className="logo" />
            <img src={imgplaceholder} alt="" className="logo" />
            <img src={imgplaceholder} alt="" className="logo" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;