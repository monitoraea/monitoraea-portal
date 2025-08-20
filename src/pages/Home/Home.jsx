import Header from '../../components/Header';

import { Link } from 'react-router-dom';
import Arrow from '../../images/arrow_2.svg?react';

import bg from '../../images/bg_top.jpg'
import miolo from '../../images/miolo_top.png'
import youtube from '../../images/youtube.png'
import instagram from '../../images/instagram.png'

import imgsobre from './sobre.png';

import em_numeros_1 from './em-numeros-1.png';
import em_numeros_2 from './em-numeros-2.png';
import em_numeros_3 from './em-numeros-3.png';

import Development from '../../components/Development';

import IniciativaCadastradas from '../../components/IniciativasCadastradas';
import NaMidia from '../../components/NaMidia';

import './style.scss';

import ContentByType from '../../components/ContentByType';
import Faq from '../../components/Faq';

import MapGeneral from '../../components/MapGeneral';

import { content_types } from '../../utils';

import { useMediaQuery } from 'react-responsive';

function Home() {
  const isMobile = useMediaQuery({ maxWidth: 991 });

  if (isMobile) return (<>
    <Header />
    <><br/><br/></>
  </>)

  return (
    <>

      <Header />

      <section id="sobre">
        <div className="width-limiter">
          <img src={imgsobre} />
        </div>
      </section>

      <MapGeneral />

      {
        ['news'/* , 'learning' */].map(c => <ContentByType
          key={c}
          id={content_types[c][2]}
          contentType={c}
          title={content_types[c][1]}
          moreText={content_types[c][3]}
          className={`content-type-${c}`}
        />)
      }

      {/* <section id='monitoraea-num'>

        <div className="width-limiter">


          <div className="inner-title-box em-numeros">
            <div className="left-side">MonitoraEA em números</div>
            <div className="right-side"></div>
          </div>

          <div className="em-numeros">
            <a href="/novidade-single/1">
              <div>
                <img src={em_numeros_1} alt="Figura Descritiva" className="image" />
              </div>
            </a>
            <a href="/novidade-single/1">
              <div>
                <img src={em_numeros_2} alt="Figura Descritiva" className="image" />
              </div>
            </a>
            <a href="/novidade-single/1">
              <div>
                <img src={em_numeros_3} alt="Figura Descritiva" className="image" />
              </div>
            </a>
          </div>
        </div>
      </section > */}

      <IniciativaCadastradas />

      <NaMidia />

      <Faq />

      <Development />

    </>
  );
}

export default Home;