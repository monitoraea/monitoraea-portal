import Header from '../../components/Header';

import { Link } from 'react-router-dom';
import Arrow from '../../images/arrow_2.svg?react';

import bg from '../../images/bg_top.jpg'
import miolo from '../../images/miolo_top.png'
import youtube from '../../images/youtube.png'
import instagram from '../../images/instagram.png'

import imgsobre from './sobre.png';

import imgfake from './novidade4.png';

import em_numeros_1 from './em-numeros-1.png';
import em_numeros_2 from './em-numeros-2.png';
import em_numeros_3 from './em-numeros-3.png';

import Dev1 from '../../images/dev_1.png'
import Dev2 from '../../images/dev_2.png'
import Dev3 from '../../images/dev_3.png'
import Dev4 from '../../images/dev_4.png'

import IniciativaCadastradas from '../../components/IniciativasCadastradas';
import NaMidia from '../../components/NaMidia';

import './style.scss';

import ContentByType from '../../components/ContentByType';
import Faq from '../../components/Faq';

import MapGeneral from '../../components/MapGeneral';

import { content_types } from '../../utils';

function Home() {
  return (
    <>

      <Header />

      <section id="sobre">
        <div className="width-limiter">
          <img src={imgsobre} />
        </div>
      </section>
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
                <div className="number">525</div>
                <div className="text red">[iniciativas]</div>
                <div className="text">cadastradas</div>
              </div>
              {/* Imagem Fake ao lado do quadrado */}
              <img className="fake-image" src={imgfake} alt="Fake Image" />
              {/*<img src={imgfake} alt="Figura Descritiva" className="image" />*/}
            </div>
          </div>
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

      <section id='monitoraea-num'>

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
      </section >

      <IniciativaCadastradas />

      <NaMidia />

      <Faq />

      <section id="desenvolvimento">

        <div className="width-limiter">

          <div className="inner-title-box desenvolvimento">
            <div className="left-side">Desenvolvimento</div>
            <div className="right-side"></div>
          </div>

          <div className="desenvolvimento-thumbs">
            <img src={Dev1} alt="Figura Descritiva" />
            <img src={Dev2} alt="Figura Descritiva" />
            <img src={Dev3} alt="Figura Descritiva" />
            <img src={Dev4} alt="Figura Descritiva" />
          </div>
          <div className="button-more-wrapper">
            <div>
              <Link to={``}>
                <button className="button-more">
                  <div>Rede de colaboradores e fomento</div>
                  <div className="icon">
                    <Arrow />
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section >

    </>
  );
}

export default Home;