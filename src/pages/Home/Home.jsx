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
      
      <MapGeneral />

      {
        ['news', 'learning'].map(c => <ContentByType
          key={c}
          id={content_types[c][2]}
          contentType={c}
          title={content_types[c][1]}
          moreText={content_types[c][3]}
          className={`content-type-${c}`}
        />)
      }

      <Faq />

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