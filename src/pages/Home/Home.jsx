import Nav from '../../components/nav/nav';

import bg from './bg_top.jpg'
import miolo from './miolo_top.png'
import youtube from './youtube.png'
import instagram from './instagram.png'

import imgsobre from './sobre.png';

import imgfake from './novidade4.png';

import em_numeros_1 from './em-numeros-1.png';
import em_numeros_2 from './em-numeros-2.png';
import em_numeros_3 from './em-numeros-3.png';

import ICanppea from '../../images/ic-anppea.png'

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
      <div className="banner">
        <img className="bg" src={bg} alt="" />
        <div className="backdrop"></div>
        <div className="content">
          <div className="title">
            <img src={miolo} alt="" />
          </div>

          <div className="right">
            <div className="social-media"><img src={youtube} alt="" /><img src={instagram} alt="" /></div>
            <button onClick={()=>window.location.href='/colabora'} className="login">Acessar</button>
          </div>
        </div>
      </div>
      <Nav />
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

        <div className="inner-title-box em-numeros">
          <div className="left-side">MonitoraEA em números</div>
          <div className="right-side"></div>
        </div>

        <div className="width-limiter">

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

      <section id="perguntas_frequentes">
        <Faq />
      </section>
      <section id="desenvolvimento">
        <div className="width-limiter">
          <div className="info-box" style={{ width: 'calc(50%)' }}>
            <div className="left-section" style={{ backgroundColor: '#2d8bba' }}>Desenvolvimento</div>
            <div className="right-section" style={{ backgroundColor: '#d6e6f8' }}> </div>
          </div>
          <div>
            <img src={ICanppea} alt="Figura Descritiva" className="image" />
            <img src={ICanppea} alt="Figura Descritiva" className="image" />
            <img src={ICanppea} alt="Figura Descritiva" className="image" />
            <img src={ICanppea} alt="Figura Descritiva" className="image" />
          </div>
          <div className="info2-box" style={{ width: 'calc(30%)' }}>Rede de colaboradorese e fomento</div>
        </div>
      </section >

      {/*   {
        ['news', 'learning'].map(c => <ContentByType
          key={c}
          id={content_types[c][2]}
          contentType={c}
          title={content_types[c][1]}
          moreText={content_types[c][3]}
          className={`content-type-${c}`}
        />)
      }*/}


      {/*
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
      </section>*/}
    </>
  );
}

export default Home;